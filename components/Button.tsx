import { forwardRef, HTMLAttributes, HTMLProps, useRef } from 'react'
import cn from 'classnames'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  type?: 'submit' | 'button' | 'reset'
}

type ButtonSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<'default' | ButtonSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
  default: 'md',
}

const getSize = (size?: ButtonSize) =>
  size ? sizeMap[size] : sizeMap[sizeMap.default]

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, size, ...props }, buttonRef) => {
    const ref = useRef<HTMLButtonElement>(null)

    const rootClassName = cn(
      'Button',
      'border border-black rounded bg-black text-white',
      getSize(size),
      className
    )

    return (
      <button className={rootClassName} ref={buttonRef} {...props}>
        {children}
      </button>
    )
  }
)
