export const readAsArrayBuffer = async f => readAs(f, 'readAsArrayBuffer')
export const readAsBinaryString = async f => readAs(f, 'readAsBinaryString')
export const readAsDataURL = async f => readAs(f, 'readAsDataURL')
export const readAsText = async f => readAs(f, 'readAsText')

const readAs = async (f, as) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => {
      let msg = 'error reading ' + f.name
      console.error(msg, f, error)
      reject(msg)
    }
    reader[as](f)
  })
