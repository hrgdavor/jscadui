let seq = 1
let reqMap = new Map()
const RESPONSE = '__RESPONSE__'
const TRANSFERABLE = Symbol.for('__transferable__')

export const withTransferable = (params,trans)=>{
  params[TRANSFERABLE] = trans
  return params
}

const fixTransfer = trans => (trans ? trans.map(a => a.buffer || a) : [])

/**
 *
 * @param {*} _self reference to self of the main window (self) or reference to a worker
 * @param {*} handlers - object where key if method name, and value ih handler
 * @returns
 */
export const initMessaging = (_self, handlers, {onJobCount}={}) => {
  // on service worker, postMessage is on the controller
  const ___self = _self.postMessage ? _self : _self.controller
  const sendResponse = (result, id) => {
    let trans = result?.[TRANSFERABLE]
    if (trans) {
      delete result[TRANSFERABLE]
    }
    try {
      ___self.postMessage({ method: RESPONSE, params: result, id }, fixTransfer(trans))
      
    } catch (error) {
      console.error('failed to send ', result, trans)
      throw error
    }
  }

  const sendError = (error, id) => {
    try {
      // serialize stacktrace so it isn't lost in transit
      const stack = error.stack
      ___self.postMessage({ method: RESPONSE, error: {message: error.message, name:error.name, stack}, id })
    } catch (error) {
      console.error('failed to send ', error)
      throw error
    }
  }

  /**
   * Send a message with no response
   *
   * @param {string} method
   * @param {object} params
   * @param {Array} trans
   */
  const sendNotify = (method, params = [], trans = []) => {
    ___self.postMessage({ method, params }, fixTransfer(trans))
  }

  /**
   * Send a message with response expected
   *
   * @param {string} method
   * @param {object} params
   * @param {Array} trans
   * @param {number?} timeout
   * @returns {Promise} resolves when response is received
   */
  const sendCmd = (method, params = [], trans = [], timeout) => {
    const id = seq++
    ___self.postMessage({ method, params, id }, fixTransfer(trans))

    const out = new Promise((resolve, reject) => {
      reqMap.set(id, [resolve, reject])
      onJobCount?.(reqMap.size)
      if (timeout) {
        setTimeout(() => {
          reject('timeout')
        }, timeout)
      }
    })
    return out
  }

  const listener = async (e) => {
    const { method, params, id, error } = e.data
    console.log('error', error)
    if (id && method === RESPONSE) {
      const p = reqMap.get(id)

      if (!p) return console.error(`req ${id} not found`,id, e.data, e)
      reqMap.delete(id)
      onJobCount?.(reqMap.size)

      const [resolve, reject] = p
      if (error) {
        // restore stacktrace
        // if(typeof error === 'string') 
        const _error = new Error(error.message)
        _error.stack = error.stack
        _error.name = error.name
        reject(_error)
      } else {
        resolve(params)
      }

      return
    }

    const fn = handlers[method]
    if (!fn) {
      const msg = 'no handler for type: ' + method
      console.error(msg, e)
      throw new Error(msg)
    }
    try {
      const out = await fn(...params)
      if (id) {
        sendResponse(out, id)
      }
    } catch (error) {
      console.log('ERR', error)
      console.error(`error executing command ${method}`, params, error)
      sendError(error, id)
    }
  }
  
  _self.addEventListener?.('message', listener)

  return { 
    sendCmd, 
    sendNotify, 
    sendResponse, 
    sendError, 
    listener, 
    self:_self, 
    getRpcJobCount:()=>reqMap.size 
  }
}

/**
 * 
 * @param {*} _self 
 * @param {*} handlers 
 * @returns {object}
*/
export const messageProxy = (_self, handlers, {sender, onJobCount}={}) => {
  const { sendCmd, sendNotify, getRpcJobCount} = sender || initMessaging(_self, handlers,{onJobCount})

  return new Proxy({
    getRpcJobCount
  },{
    get(target, prop, receiver) {
      if(prop in target)  return target[prop]
      if(prop.startsWith('on')){
        return target[prop] = function(...params){
          sendNotify(prop, params)
        }  
      }
      return target[prop] = function(...params){
        return sendCmd(prop, params)
      }
    },
  })
}
