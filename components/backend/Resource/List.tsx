import { HTMLAttributes } from 'react'
import cn from 'classnames'
import Link from 'next/link'

interface Resource {
  id: number
  name: string
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string
  data: Resource[]
}

export function List({ name, data, ...props }: Props) {
  return (
    <div className="divide-y" {...props}>
      {data.map((resource) => (
        <Link key={resource.id} href={`/backend/${name}/${resource.id}`}>
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
