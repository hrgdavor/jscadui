// it is possible to read binary data
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

export const readFileWeb = (path, {base = '', output='text'}={}) => {
  const req = new XMLHttpRequest()
  req.open('GET', base ? new URL(path, base) : path, 0) // sync

  if(output !== 'text'){
    // this hack was hard to find, and we can not use fetch because we need sync request
    // XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
    req.overrideMimeType("text/plain; charset=x-user-defined");    
  }
  
  req.send()
  if (req.status && req.status === 404) {
    throw new Error(`file not found ${path}`)
  } else if (req.status && req.status !== 200) {
    throw new Error(`failed to fetch file ${path} ${req.status} ${req.statusText}`)
  }

  return output == 'text' ? req.responseText : req.response
}
