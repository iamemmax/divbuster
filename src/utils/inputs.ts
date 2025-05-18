/**
 * Checks if the current device is running iOS
 */
export const checkIsIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

/**
 * Disables zooming on iOS when focusing on text fields
 */
export const disableIOSTextFieldZoom = (): void => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.head.appendChild(meta);
  } else {
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
  }
};

/**
 * Toggles body scroll
 * @param disable Whether to disable body scrolling
 */
export const toggleBodyScroll = (disable: boolean): void => {
  if (typeof document === 'undefined') return;
  
  if (disable) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.height = '';
  }
};
