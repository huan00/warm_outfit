import GearSlot from '../components/GearSlot'
import { OutfitResponse } from '../typings/weather'

type props = {
  data: OutfitResponse | undefined
}

const Avartar = ({ data }: props) => {
  return (
    <div className=" flex h-full flex-col relative justify-start md:w-full rounded-md overflow-y-scroll no-scrollbar">
      <div className="">
        <p className="text-white w-full text-md bg-slate-500 bg-opacity-50 rounded p-2 my-2 whitespace-pre-wrap">
          {data?.suggestion}
        </p>
      </div>
      <div className="w-full flex flex-col text-white">
        <div className="flex gap-2 mb-2">
          <GearSlot category="Head" data={data?.head} />
          <GearSlot category="Accessory" data={data?.accessory} />
        </div>
        <div className="flex w-full aspect-[2/1] mb-2 gap-2 bg-slate-700 bg-opacity-30 rounded-3xl">
          {data?.jacket && data?.jacket.length > 0 ? (
            <div className="flex w-full aspect-[2/1]">
              <GearSlot
                category="Tops"
                categories="Tops-Jacket"
                data={data?.tops}
                dataTwo={data?.jacket}
                // bgActive={true}
                fullWidth={true}
              />
            </div>
          ) : (
            <div className="flex w-full justify-center aspect-[2/1]">
              <div className="w-full">
                <GearSlot
                  category="Tops"
                  data={data?.tops}
                  // bgActive={true}
                  fullWidth={true}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex flex-1 flex-col  gap-2">
            <GearSlot category="Pants" data={data?.pants} />
            <GearSlot category="Footware" data={data?.shoe} />
          </div>
          <div className="flex w-1/2 ">
            <GearSlot category="Extras" data={data?.extras} />
          </div>
        </div>

        <div className="flex"></div>
      </div>
    </div>
  )
}

export default Avartar
