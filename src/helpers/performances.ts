/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay = 500,
) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
