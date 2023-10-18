// export { default as hat } from './hat.png'
// export { default as tshirt } from './tshirt.png'
// export { default as jacket } from './jacket.png'
// export { default as pants } from './pants.png'
// export { default as shoes } from './shoes.png'

import { default as hat } from './hat.png'
import { default as tshirt } from './tshirt.png'
import { default as jacket } from './jacket.png'
import { default as pants } from './pants.png'
import { default as shoes } from './shoes.png'
import { default as accessory } from './accessory.png'

interface STOCKTYPE {
  [key: string]: string
}

export const STOCKIMG: STOCKTYPE = {
  head: hat,
  tops: tshirt,
  jacket: jacket,
  pants: pants,
  footware: shoes,
  accessory
}
