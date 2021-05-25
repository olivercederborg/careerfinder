import { forwardRef, HTMLProps } from 'react'
import cn from 'classnames'

interface Props extends HTMLProps<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type = 'text', ...props }: Props, inputRef) => {
    const rootClassName = cn(
      'Input',
      'w-full px-4 py-2 border border-gray-300 rounded',
      className
    )

    return (
      <input className={rootClassName} type={type} ref={inputRef} {...props} />
    )
  }
)
