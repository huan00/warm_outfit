import React from 'react'
import { IMGLIST } from '../assets/data/clothing'

type props = {
  category: string
  imgUrl?: string
  name?: string
  border?: boolean
  icons?: boolean
  data: string[] | undefined
  bgActive?: boolean
}

const GearSlot = ({
  imgUrl,
  name,
  border = true,
  icons = false,
  category,
  data,
  bgActive = false
}: props) => {
  const getImg = (name: string, category: string) => {
    if (name) {
      const names = name.replace('-', ' ').toLowerCase()
      const result = IMGLIST.filter((item) => item.keywords.includes(names))

      if (result[0]) {
        return result[0].imgUrl
      } else {
        const defaultImg = IMGLIST.filter(
          (item) => item.category === category.toLowerCase()
        )
        return defaultImg[0] ? defaultImg[0].imgUrl : undefined
      }
    }
  }

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
      <div className="flex flex-1 w-3/4 absolute -bottom-[35%] justify-center items-center">
        <img src={data && getImg(data[0], category)} alt={category} />
      </div>
    </div>
  )
}

export default GearSlot
