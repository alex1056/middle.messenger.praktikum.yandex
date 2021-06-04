export function renderDOM(query: string, block: HTMLElement): HTMLElement {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block);
    return root as HTMLElement;
  }
  throw new Error('Root элемент не найден!');
}
