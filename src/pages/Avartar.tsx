import GearSlot from '../components/GearSlot'
// import { head, torso, legs, feet, accessories } from '../assets/gear_slot'
import { OutfitResponse } from '../typings/weather'
import outfit_data from '../assets/data/outfit_data.json'

import { IMGLIST } from '../assets/data/clothing'

type props = {
  data: OutfitResponse | undefined
}

type outfit_type = {
  name: string
  keywords: string[]
  description: string
  imageUrl: string
}

const Avartar = ({ data }: props) => {
  const filter_result = (input: string): outfit_type | undefined => {
    let result

    for (let i = 0; i < outfit_data.length; i++) {
      if (
        outfit_data[i].keywords.includes(input.toLowerCase()) ||
        outfit_data[i].name.includes(input.toLowerCase())
      ) {
        result = outfit_data[i] as outfit_type
        break
      }
    }

    return result
  }
  const getImg = (name: string) => {
    const result = IMGLIST.map((object) => {
      let match: boolean = false
      for (let i = 0; i < object.keywords.length; i++) {
        if (object.keywords[i] === name.toLowerCase()) {
          match = true
          break
        }
      }
      if (match) {
        return object.imgUrl
      } else {
        return undefined
      }
    })

    return result[0]
  }

  return (
    <div className="w-full md:w-3/4">
      <p className="text-white w-full text-sm bg-slate-500 rounded p-2 my-2 whitespace-pre-wrap">
        {data?.suggestion}
      </p>
      <div className="flex flex-col text-white">
        <div className="flex">
          <div>
            <GearSlot name="Accessory" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.accessory.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>

        <div className="flex">
          <div>
            <GearSlot name="Head Gear" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.head.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full ">
          <div className="flex">
            <GearSlot name="Tops" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.tops.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                icons={true}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>

        <div className="flex">
          <div>
            <GearSlot name="Jacket" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.jacket.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>

        <div className="flex">
          <div>
            <GearSlot name="Pants" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.pants.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>

        <div className="flex">
          <div>
            <GearSlot name="Footware" />
          </div>
          <div className="flex mx-4 w-3/4 overflow-x-scroll justify-start">
            {data?.shoe.map((item) => (
              <GearSlot
                imgUrl={getImg(item)}
                name={item}
                key={Math.random() + item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avartar
