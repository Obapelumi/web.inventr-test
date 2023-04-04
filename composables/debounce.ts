export function useDebounce<T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  delay: number
): T {
  let timeoutID: NodeJS.Timeout
  return function (this: any) {
    clearTimeout(timeoutID)
    let args = arguments as any
    let that = this
    timeoutID = setTimeout(function () {
      callback.apply(that, args)
    }, delay)
  } as T
}
