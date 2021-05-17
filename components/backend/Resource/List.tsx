import { HTMLAttributes } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { Button } from 'components/Button'

interface Props extends HTMLAttributes<HTMLDivElement> {
  resourceName: string
  resourceData: any[]
}

export function List({ resourceName, resourceData, ...props }: Props) {
  return (
    <div {...props} className="divide-y">
      {resourceData.map((resource, idx) => (
        <Link
          key={resource.id}
          href={`/backend/${resourceName}/${resource.id}`}
        >
          <a
            className={cn(
              'flex justify-between items-center px-4 py-2 hover:bg-gray-100'
            )}
          >
            {resource.name}
          </a>
        </Link>
      ))}
    </div>
  )
}
