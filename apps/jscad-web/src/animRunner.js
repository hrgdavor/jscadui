
/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/


export class AnimRunner{
  /**
   * 
   * @param {JscadWorker} worker 
   */
  constructor(worker, options={}){
    /** @type {JscadWorker} */
    this.worker = worker
    this.options = options
  }
  
  pause(){
    this.shouldPause = true
  }

  isRunning(){
    return this.running
  }

  async start(def, value, params){
    this.running = true
    this.shouldPause = false

    let {fps, min=0, max, loop, name} = def
    if(params.fps) fps = params.fps
    let step = 1/fps
    let minMaxDelta = max - min
    let fpsMs = 1000 / fps - 1
    value = parseFloat(value) + step

    let lastTime, now, delta, resp, paramValues, times
    let startTime = lastTime = now = Date.now()
    let t = value
    let i=1;
    let dir = loop == 'reverse' ? 1 : 0


    while(!this.shouldPause){
      if(t>max){
        while( t> max) t -= minMaxDelta
        
        if(loop == 'reverse'){
          dir *= -1
        } else if(loop != 'restart'){
          // end animation
          break
        }
      }

      times = {[name]: (dir == 1) ? t : max - t}
      console.warn('t', times[name], t)
      paramValues = {...params, ...times}
      resp = await this.worker.jscadMain({params:paramValues, skipLog:true})
      console.warn('resp', times[name], t)
      if(this.shouldPause) break

      now = Date.now()
      delta = now - lastTime
      if(delta < fpsMs){
        await waitTime(fpsMs - delta - 1)
        if(this.shouldPause){
          console.log('Animation stopped between generating frame for '+name+'='+times[name]+' and rendering it. Discarding the result.')
          break
        } 
      }
      lastTime = Date.now()
      t += step
      this.options?.handleEntities?.(resp, paramValues, times)
    }
    this.options?.handleEnd?.()
  }
}

async function waitTime(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}