// it is possible to read binary data
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

export const readFileWeb = (path, {base = '', output='text'})=>{
  try {
    const X = new XMLHttpRequest()
    X.open('GET', base ? new URL(path, base) : path, 0) // sync
    X.send()
    if (X.status && X.status !== 200) throw new Error(X.statusText)
    return X.responseText
  } catch (e) {
    console.error('problem reading file ', path, 'root', base, ' error:', e.message)
    throw e
  }
}
