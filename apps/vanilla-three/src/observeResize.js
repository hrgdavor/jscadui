
export const observeResize = (el, listener)=>{
  // ResizeObserver is beter than window resize as it can be used on any element
  // this is a short/compact/simple implementation that uses a new ResizeObserver each time.
  // which is fine probably up-to 50 of them. There is a performance hit if too many are created.
  // for an implementation that can handle more take a look at https://github.com/hrgdavor/jsx6/tree/main/libs/dom-observer
  const resizeObserver = new ResizeObserver(entries => {
    listener(entries[0])
  })
  console.log(el)
  resizeObserver.observe(el)
}
