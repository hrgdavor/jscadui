
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
    let {fps, min=0, max, loop} = def
    if(params.fps) fps = params.fps
    let minMaxDelta = max - min
    let fpsMs = 1000 / fps - 1
    this.shouldPause = false
    let lastTime, now, delta, resp, paramValues, times
    let startTime = lastTime = now = Date.now()
    let offset = startTime - (value * 1000)
    let name = def.name
    let t = value
    let i=1;
    let dir = loop == 'reverse' ? 1 : 0


    while(!this.shouldPause){
      times = {[name]:t}
      paramValues = {...params, ...times}
      resp = await this.worker.jscadMain({params:paramValues, skipLog:true})
      if(this.shouldPause) break

      now = Date.now()
      delta = now - lastTime
      t = (now - offset)/1000
      if(t>max){
        console.log('dir', dir)
        while( t> max) t -= minMaxDelta

        // this formula is a better compromise, works well for small fps, 
        // but should not make visible issues to faster fps
        offset = now
        // this old formula(commented below) is more precise but was problematic for low fps as
        // introduced drifting due to sleep and animation frame is difficult to align to exact time
        // offset = now - (t * 1000)
        
        if(loop == 'reverse'){
          dir *= -1
        } else if(loop != 'restart'){
          break
        }
      }

      if(dir == -1) t = max - t
      if(delta < fpsMs){
        await waitTime(fpsMs - delta)
        if(this.shouldPause) break
      }
      lastTime = now
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