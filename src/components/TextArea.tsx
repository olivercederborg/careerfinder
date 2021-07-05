import { forwardRef, HTMLProps } from 'react'
import cn from 'classnames'

interface Props extends HTMLProps<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ children, className, type = 'text', ...props }: Props, textareaRef) => {
    const rootClassName = cn(
      'TextArea',
      'w-full px-4 py-2 border border-gray-300 rounded',
      className
    )

    return (
      <textarea className={rootClassName} ref={textareaRef} {...props}>
        {children}
      </textarea>
    )
  }
)

TextArea.displayName = 'TextArea'
