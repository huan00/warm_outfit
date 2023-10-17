import GearSlot from '../components/GearSlot'
// import { head, torso, legs, feet, accessories } from '../assets/gear_slot'
import { OutfitResponse } from '../typings/weather'

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
  console.log(data)
  return (
    <div className="flex flex-col md:justify-center md:w-3/4 md:items-center">
      <p className="text-white w-full text-sm bg-slate-500 bg-opacity-50 rounded p-2 my-2 whitespace-pre-wrap">
        {data?.suggestion}
      </p>
      <div className="w-full flex flex-col text-white">
        <div className="flex gap-2 mb-2">
          <div className="flex flex-1 overflow-x-scroll justify-start">
            <GearSlot category="Head" data={data?.head} />
          </div>

          <div className="flex flex-1 overflow-x-scroll justify-start">
            <GearSlot category="Accessory" data={data?.accessory} />
          </div>
        </div>
        <div className="flex w-full aspect-[2/1] mb-2 gap-2 bg-slate-700 bg-opacity-30 rounded-3xl">
          <GearSlot category="Tops" data={data?.tops} bgActive={true} />
          <GearSlot category="Jacket" data={data?.jacket} bgActive={true} />
        </div>

        <div className="flex gap-2">
          <GearSlot category="Pants" data={data?.pants} />
          <GearSlot category="Footware" data={data?.shoe} />
        </div>

        <div className="flex"></div>
      </div>
    </div>
  )
}

export default Avartar
