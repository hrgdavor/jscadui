let seq = 1
let reqMap = new Map()
const RESPONSE = '__RESPONSE__'
const TRANSFERABLE = '__transferable'

const messageHandler = (handlers, sendResponse) => {
  return e => {
    const { method, params, id, error } = e.data
    console.log('e', method, id, e.data, e.target)
    if (id && method === RESPONSE) {
      const p = reqMap.get(id)

      if (!p) return console.error(`req ${id} not found`)
      reqMap.delete(id)

      if (error) p[1](error)
      else p[0](params)

      return
    }

    const fn = handlers[method]
    if (!fn) {
      throw new Error('no handler for type: ' + method)
    }
    try {
      const out = fn(params)
      if (id) {
        if (out?.then) {
          out.then(resp => sendResponse(resp, id))
        } else {
          sendResponse(out, id)
        }
      }
    } catch (error) {
      console.log('problem executing command', method, params, error.message)
      throw error
    }
  }
}

const fixTransfer = trans => trans ? trans.map(a => a.buffer || a) : []

const messageSender = _self => {
  const sendResponse = (params, id) => {
    let trans = params?.[TRANSFERABLE]
    if (trans) {
      delete params[TRANSFERABLE]
    }
    _self.postMessage({ method:RESPONSE, params, id }, fixTransfer(trans))
  }

  const sendNotify = (method, params = {}, trans = []) => {
    _self.postMessage({ method, params }, fixTransfer(trans))
  }

  const sendCmd = (method, params = {}, trans = [], timeout) => {
    const id = seq++
    _self.postMessage({ method, params, id }, fixTransfer(trans))

    const out = new Promise((resolve, reject) => {
      reqMap.set(id, [resolve, reject])
      if (timeout) {
        setTimeout(() => {
          reject('timeout')
        }, timeout)
      }
    })
    return out
  }

  return { sendCmd, sendNotify, sendResponse }
}

/**
 * 
 * @param {*} _self reference to self of the main widnow (self) or reference to a worker 
 * @param {*} handlers - object where key if method name, and value ih handler
 * @returns 
 */
export const initMessaging = (_self, handlers) => {
  const { sendCmd, sendNotify, sendResponse } = messageSender(_self)

  _self.addEventListener('message', messageHandler(handlers, sendResponse))

  return { sendCmd, sendNotify }
}
