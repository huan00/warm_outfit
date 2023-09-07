import React from 'react'
import GearSlot from '../components/GearSlot'
import { head, torso, legs, feet, accessories } from '../assets/gear_slot'
import { OutfitResponse } from '../typings/weather'

type props = {
  data: OutfitResponse | undefined
}

const Avartar = ({ data }: props) => {
  return (
    <div className="w-full md:w-3/4 md:self-center">
      <p className="text-white w-11/12 bg-slate-500 rounded p-2 my-2 whitespace-pre-wrap">
        {data?.weather_condition}
      </p>
      <div className="text-white">
        <div className="flex">
          <GearSlot imgUrl={accessories} />
          <p className="text-4xl self-center place-self-center "> = </p>
          <div className="flex items-center flex-col text-center justify-center">
            {data?.data.accessories.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
          </div>
        </div>
        <div className="flex">
          <GearSlot imgUrl={head} />
          <p className="text-4xl self-center place-self-center "> = </p>
          <div className="flex items-center flex-col text-center justify-center">
            {data?.data.head.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
          </div>
        </div>
        <div className="flex">
          <GearSlot imgUrl={torso} />
          <p className="text-4xl self-center place-self-center "> = </p>
          <div className="flex items-center flex-col text-center justify-center">
            {data?.data.tops.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
            {data?.data.jacket.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
          </div>
        </div>
        <div className="flex">
          <GearSlot imgUrl={legs} />
          <p className="text-4xl self-center place-self-center "> = </p>
          <div className="flex items-center flex-col text-center justify-center">
            {data?.data.bottoms.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
          </div>
        </div>
        <div className="flex">
          <GearSlot imgUrl={feet} />
          <p className="text-4xl self-center place-self-center "> = </p>
          <div className="flex items-center flex-col text-center justify-center">
            {data?.data.footware.map((el) => (
              <GearSlot name={el} border={false} key={el + Math.random()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avartar
