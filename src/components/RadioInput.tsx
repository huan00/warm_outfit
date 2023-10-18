type PropsType = {
  title: string
  radio: boolean
  onClickSelect: (gender: string) => void
}

const RadioInput = ({ title, radio = false, onClickSelect }: PropsType) => {
  return (
    <div className="px-4" onClick={() => onClickSelect(title)}>
      <div className="flex items-center justify-between border-b border-black py-3 pr-4 cursor-pointer hover:bg-slate-300">
        <div
          className={`w-4 aspect-square border border-black rounded-full ${
            radio ? 'bg-black' : ''
          }`}
        />
        <p>{title}</p>
      </div>
    </div>
  )
}

export default RadioInput
