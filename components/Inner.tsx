import { HTMLAttributes } from 'react'
import cn from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: InnerSize
}

type InnerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const sizeMap: Record<'default' | InnerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  default: 'lg',
}

const getSize = (size?: InnerSize) =>
  size ? sizeMap[size] : sizeMap[sizeMap.default]

export const Inner = ({
  size = 'lg',
  children,
  className,
  ...props
}: Props) => {
  const rootClassName = cn(
    'Inner',
    'mx-auto w-full px-4 sm:px-8 lg:px-12',
    getSize(size),
    className
  )

  return (
    <>
      <div className={rootClassName} {...props}>
        {children}
      </div>
    </>
  )
}
