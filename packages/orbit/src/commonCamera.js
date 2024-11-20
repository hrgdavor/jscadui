const { PI } = Math
const PId2 = PI / 2
export const TAU = PI * 2

/** 
 * @param {string} name 
 * @returns {[number,number]}
 */
export const getCommonRotCombined = name => {
  name = name.toUpperCase()
  let rx = PId2
  let rz = 0
  let rz1
  let rz2
  let topOrBottom
  for (let i = 0; i < name.length; i++) {
    const ch = name[i]
    const rot = getCommonRotByName(ch)
    if (ch === 'T' || ch === 'B') {
      rx = rot[0]
      topOrBottom = ch
    } else {
      if (rz1 === undefined) rz1 = rot[1]
      else rz2 = rot[1]
    }
  }
  if (rz1 !== undefined) {
    if (topOrBottom) rx = topOrBottom === 'T' ? PI / 4 : PI * 0.75
    if (rz2 !== undefined) {
      if (rz2 < rz1) {
        const tmp = rz2
        rz2 = rz1
        rz1 = tmp
      }
      // edge case fix so my fancy math works
      if (rz1 === 0 && rz2 >= PI * 1.5) rz2 = -PId2
      rz = (rz1 + rz2) / 2
    } else {
      rz = rz1
    }
  }
  return [rx, rz]
}

/**
 * @param {string} name 
 * @returns {[number,number]}
 */
export const getCommonRotByName = name => {
  return commonCameras[name] || commonCameras.top //TODO Check .top this looks like a bug
}

export const commonCameras = {
  T: [1e-10, 0],
  B: [PI, 0],
  S: [PId2, 0],
  N: [PId2, PI],
  W: [PId2, PI * 1.5],
  E: [PId2, PId2],
}
