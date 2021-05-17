import cn from 'classnames'
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {}

export function Alert({ children, className, ...props }: Props) {
  const rootClassName = cn(
    'Alert',
    'shadow px-4 py-2 text-sm italic',
    className
  )

  return (
    <div className={rootClassName} {...props}>
      {children}
    </div>
  )
}
