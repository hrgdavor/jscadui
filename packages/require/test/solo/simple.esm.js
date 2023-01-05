
export const main = ({size=10})=>{
  return makeModel({size})
}

const makeModel = ({size})=>`cube${size}`
