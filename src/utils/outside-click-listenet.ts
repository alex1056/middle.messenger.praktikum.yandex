const isVisible = (elem: any) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

export function hideOnClickOutside(element: HTMLElement): void {
  const outsideClickListener = (event: any) => {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      element.style.display = 'none';
      removeClickListener();
    }
  };

  function removeClickListener() {
    document.removeEventListener('click', outsideClickListener);
  }

  document.addEventListener('click', outsideClickListener);
}
