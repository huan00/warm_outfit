import React from 'react'

type props = {
  imgUrl?: string
  name?: string
  border?: boolean
}

const GearSlot = ({ imgUrl, name, border = true }: props) => {
  return (
    <div className={`w-24 ${border ? 'border-2 border-slate-600' : ''} mb-1`}>
      <img src={imgUrl} alt="" className="w-24" />
      <p>{name && name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </div>
  )
}

export default GearSlot
