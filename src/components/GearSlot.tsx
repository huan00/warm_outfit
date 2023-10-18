import { STOCKIMG } from '../assets/stock'

type props = {
  category: string
  imgUrl?: string
  name?: string
  border?: boolean
  icons?: boolean
  data: string[] | undefined
  bgActive?: boolean
}

const GearSlot = ({ category, data, bgActive = false }: props) => {
  const displayStock = (category: string) => {
    return STOCKIMG[category.toLowerCase()]
  }

  console.log(displayStock(category))

  return (
    <div
      className={`flex flex-col items-center w-full aspect-square rounded-3xl relative ${
        bgActive ? '' : 'bg-slate-700 bg-opacity-30'
      } overflow-hidden `}
    >
      <div className="w-full flex justify-center mt-3">
        <p className="flex text-slate-200 z-10 font-semibold">{category}</p>
      </div>
      <div className="w-full px-2 flex justify-between relative top-1/3 -translate-y-2/3 z-10">
        <div className="flex flex-col w-full mt-2 text-clip ">
          {Array.isArray(data) ? (
            data?.map((item) => (
              <p className="text-center font-bold z-10" key={item}>
                {item}
              </p>
            ))
          ) : (
            <p className="text-center font-bold z-10">{data}</p>
          )}
        </div>
      </div>
      <div className="flex w-3/4 relative top-[20%] md:top-1/3 items-start ">
        <img
          src={displayStock(category)}
          alt={category}
          className="w-full object-cover"
        />
      </div>
    </div>
  )
}

export default GearSlot
