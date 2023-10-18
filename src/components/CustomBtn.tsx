type props = {
  onClick: () => void
  title: string
  bgColor?: string
  disable?: boolean
}

const CustomBtn = ({
  onClick,
  title,
  bgColor = '',
  disable = false
}: props) => {
  return (
    <div
      className={`w-full h-7 ring-green-500 text-white   ${
        disable ? 'bg-gray-500' : bgColor ? bgColor : 'bg-green-800'
      }  flex justify-center items-center rounded-lg ${
        disable ? 'cursor-not-allowed' : 'cursor-pointer'
      } py-5`}
      onClick={
        disable
          ? (e) => {
              e.preventDefault()
            }
          : onClick
      }
    >
      <p className="px-2">{title}</p>
    </div>
  )
}

export default CustomBtn
