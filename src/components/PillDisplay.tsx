type props = {
  title: string
}

const PillDisplay = ({ title }: props) => {
  return (
    <div className="w-full mb-1 py-1 px-2 border border-slate-600 rounded-2xl bg-slate-500">
      <p className="text-xl">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </p>
    </div>
  )
}

export default PillDisplay
