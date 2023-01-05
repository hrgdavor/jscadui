
type makeModelParams = {
  size:number
}

export const makeModel = ({size=10}:makeModelParams):string=>`cube${size}`
