interface Props {
  increaseBy: number
  loadedAmount: number
  setLoadedAmount: (number) => void
}

type IncreaseFunction = (number) => void

const LoadMoreButton = ({
  increaseBy,
  loadedAmount,
  setLoadedAmount,
}: Props) => {
  const increaseLoadedAmount: IncreaseFunction = (increaseBy: number) => {
    setLoadedAmount((loadedAmount) => loadedAmount + increaseBy)
  }

  return (
    <button
      onClick={() => increaseLoadedAmount(increaseBy)}
      className="rounded-xl flex px-6 py-4 mx-auto my-4 text-center text-white bg-black"
    >
      Load {increaseBy} more
    </button>
  )
}
export default LoadMoreButton
