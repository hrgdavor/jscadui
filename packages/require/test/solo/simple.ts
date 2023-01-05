
export const main = ({size=10})=>{
  return makeModel({size})
}

type makeModelParams = {
  size:number
}

const makeModel = ({size=10}:makeModelParams):string=>`cube${size}`
