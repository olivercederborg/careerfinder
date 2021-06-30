import cn from 'classnames'
import { HTMLProps } from 'react'

type AlertVariant = 'success' | 'error' | 'warning'

const variantMap: Record<'default' | AlertVariant, string> = {
  success: 'text-green-200 bg-green-500',
  error: 'text-red-200 bg-red-500',
  warning: 'text-yellow-200 bg-yellow-500',
  default: 'text-gray-200 bg-gray-500',
}

const getVariant = (variant?: AlertVariant) =>
  variant ? variantMap[variant] : variantMap.default

interface Props extends HTMLProps<HTMLDivElement> {
  variant?: AlertVariant
}

export function Alert({ children, className, variant, ...props }: Props) {
  const rootClassName = cn(
    'Alert',
    'shadow px-4 py-2 text-sm italic',
    getVariant(variant),
    className
  )

  return (
    <div className={rootClassName} {...props}>
      {children}
    </div>
  )
}

Alert.defaultProps = {
  variant: undefined,
}
