import GearSlot from '../components/GearSlot'
import { OutfitResponse } from '../typings/weather'

type props = {
  data: OutfitResponse | undefined
}

const Avartar = ({ data }: props) => {
  return (
    <div className="flex flex-col justify-start md:w-3/4">
      <div>
        <p className="text-white w-full text-md bg-slate-500 bg-opacity-50 rounded p-2 my-2 whitespace-pre-wrap">
          {data?.suggestion}
        </p>
      </div>
      <div className="w-full h-fit flex flex-col text-white">
        <div className="flex gap-2 mb-2">
          <GearSlot category="Head" data={data?.head} />
          <GearSlot category="Accessory" data={data?.accessory} />
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
