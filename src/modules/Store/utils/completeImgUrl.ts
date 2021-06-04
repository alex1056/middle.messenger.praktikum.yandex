import { urlApiResources } from '../../Api';

export const completeImgUrl = (data: any) => {
  const newData = data.map((item: any) => ({
    ...item,
    avatar: item.avatar ? `${urlApiResources}${item.avatar}` : null,
  }));
  return newData;
};
