import { STOCKIMG } from '../assets/stock'

type props = {
  category: string
  categories?: string
  data: string[] | undefined
  dataTwo?: string[] | undefined
  bgActive?: boolean
}

const GearSlot = ({
  category,
  data,
  bgActive = false,
  categories,
  dataTwo
}: props) => {
  const displayStock = (category: string) => {
    return STOCKIMG[category.toLowerCase()]
  }

  return (
    <div
      className={`flex flex-col justify-start items-center w-full h-full aspect-square rounded-3xl relative ${
        bgActive ? '' : 'bg-slate-700 bg-opacity-30'
      } overflow-hidden `}
    >
      <div className="w-full flex flex-col items-center justify-center mt-3 relative">
        <p className="flex text-slate-200 z-10 font-semibold">
          {categories ? categories : category}
        </p>
        <div className="w-full px-2 flex justify-between relative top-[40%] -translate-y-2/3 z-10">
          <div className="flex flex-col w-full mt-2 text-clip items-center ">
            {Array.isArray(data) ? (
              data.length > 0 ? (
                data?.map((item) => (
                  <p
                    className="text-center text-xs md:text-base font-bold z-10"
                    key={item}
                  >
                    -{item}
                  </p>
                ))
              ) : (
                <p className="text-center text-xs md:text-base font-bold z-10">
                  -{`No ${category} required`}
                </p>
              )
            ) : (
              <p className="text-center text-xs md:text-base font-bold z-10">
                -{data === undefined ? `No ${category} required` : data}
              </p>
            )}
          </div>
          {categories && (
            <div className="flex flex-col w-full mt-2 text-clip ">
              {Array.isArray(dataTwo) ? (
                dataTwo?.map((item) => (
                  <p
                    className="text-center text-xs md:text-base font-bold z-10"
                    key={item}
                  >
                    -{item}
                  </p>
                ))
              ) : (
                <p className="text-center font-bold z-10">-{dataTwo}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {categories ? (
        <div className="flex">
          <div className="translate-x-16 translate-y-4 z-10">
            <img
              src={displayStock(categories.split('-')[0])}
              alt={category}
              className=" object-cover"
            />
          </div>
          <div className="-translate-x-14">
            <img
              src={displayStock(categories.split('-')[1])}
              alt={category}
              className="w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex absolute top-[40%] md:top-1/3 items-start ">
          <img
            src={displayStock(category)}
            alt={category}
            className="w-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default GearSlot
