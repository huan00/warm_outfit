import React from 'react'

type props = {
  imgUrl?: string
  name?: string
  border?: boolean
  icons?: boolean
}

const GearSlot = ({ imgUrl, name, border = true, icons = false }: props) => {
  return (
    <div className={'w-24 h-24 mb-1 mr-2 rounded relative'}>
      {imgUrl && <img src={imgUrl} alt="" className="w-24 h-24 px-1 py-2" />}
      {name && (
        <div
          style={
            icons
              ? {
                  position: 'relative',
                  bottom: 'unset'
                }
              : undefined
          }
          className={`flex bg-slate-700 py-2 px-1 bg-opacity-50 absolute bottom-0 rounded
        ${
          imgUrl
            ? ''
            : 'h-24 w-24 text-center bg-opacity-100 justify-center items-center mr-4'
        }
        `}
        >
          <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
      )}
    </div>
  )
}

export default GearSlot
