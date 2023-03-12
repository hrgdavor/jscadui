export async function addScript(source, module = false) {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script')
    tag.type = module ? 'module' : 'text/javascript'
    tag.src = source
    tag.onload = ()=>resolve()
    tag.onerror = err => reject(err)
    document.head.append(tag)
  })
}
