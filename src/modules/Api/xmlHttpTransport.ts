function queryParams(params: any = {}) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

function withQuery(url: string, params: any = {}): string {
  const queryString = queryParams(params);
  return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
}

export interface RequestOptions {
  ignoreCache?: boolean;
  headers?: { [key: string]: string };
  timeout?: number;
}

export interface RequestResult {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T;
  headers: string;
}

function parseXHRResult(xhr: XMLHttpRequest): RequestResult {
  // console.log('xhr=', xhr);
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: <T>() => JSON.parse(xhr.responseText) as T,
  };
}

function errorResponse(xhr: XMLHttpRequest, message: string | null = null): RequestResult {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: <T>() => JSON.parse(message || xhr.statusText) as T,
  };
}

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS;
  data?: any;
  timeout?: number;
  headers?: { [key: string]: string };
  form?: any;
};

export class HTTPTransport {
  get = (url: string, options: Options = {}): Promise<RequestResult> => {
    const { data } = options;
    if (data) {
      return this.request(withQuery(url, data), { ...options, method: METHODS.GET }, options.timeout);
    }
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: Options = {}): Promise<RequestResult> =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: string, options: Options = {}): Promise<RequestResult> =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: string, options: Options = {}): Promise<RequestResult> =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  reject = (err: any) => {
    throw new Error(err);
  };

  request = (url: string, options: Options, timeout: number = 5000): Promise<RequestResult> => {
    const { method, headers, data, form } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.open(method as string, url);

      try {
        if (headers) {
          Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
        }
      } catch (err) {
        console.log('Ошибка во время установки заголовков', err);
      }

      xhr.onload = () => resolve(parseXHRResult(xhr));

      xhr.onerror = () => resolve(errorResponse(xhr, 'Невозможно сделать запрос'));

      xhr.ontimeout = () => {
        resolve(errorResponse(xhr, 'Время ожидания запроса истекло'));
      };

      xhr.onabort = (e) => {
        reject(e);
      };

      if (!data && !form) {
        xhr.send();
      } else if (form) {
        xhr.send(form);
      } else {
        xhr.send(JSON.stringify(data));
      }
      // if (method === METHODS.GET || method === METHODS.DELETE || !data) {
      //   xhr.send();
      // } else if ((method === METHODS.POST || method === METHODS.PUT) && data) {
      //   console.log(data);
      //   xhr.send(JSON.stringify(data));
      // } else {
      //   xhr.send(data);
      // }
    });
  };
}
