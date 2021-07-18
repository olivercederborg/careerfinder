import { useEffect, useRef, useState } from 'react'

type Props = {
  children: any
  buttonText?: string
  action?: () => void
}

export default function Modal({ children, buttonText, action }: Props) {
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  const [isOpen, setIsOpen] = useState<boolean>()

  const handleClickOutside = (e) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && setIsOpen(false)
      })
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen)
          action()
        }}
        className="rounded-xl hover:-translate-y-1 hover:shadow-lg md:w-auto self-center w-full px-12 py-4 mt-12 font-medium text-black transition-all duration-200 ease-in-out transform bg-white border-2 border-white"
        id="menu-button"
      >
        {buttonText || 'Open Modal'}
      </button>

      {isOpen && (
        <div className="bg-opacity-70 md:pt-16 lg:pt-20 fixed top-0 bottom-0 left-0 right-0 z-20 pt-12 bg-black">
          <div
            ref={containerRef}
            className="md:max-w-xl rounded-2xl max-w-sm px-6 py-8 mx-auto text-left bg-white"
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
