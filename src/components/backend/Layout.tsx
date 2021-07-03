import { Button } from 'components/Button'
import { Inner } from 'components/Inner'
import Link from 'next/link'
import { HTMLProps } from 'react'
import Sidebar from './Sidebar'

interface Props extends HTMLProps<HTMLDivElement> {
  name?: string
  createUrl?: string
}

export function Layout({ children, name, createUrl }: Props) {
  return (
    <>
      <div className="grid grid-cols-[250px,1fr]">
        <Sidebar></Sidebar>
        <div className="grid grid-rows-[100px,1fr]">
          <header className="p-8 bg-gray-100 border-b flex items-center">
            {name ? <h1 className="text-3xl">{name}</h1> : null}
            {createUrl ? (
              <div className="ml-auto">
                <Link href={createUrl}>
                  <Button>Create</Button>
                </Link>
              </div>
            ) : null}
          </header>

          <Inner className="my-16">{children}</Inner>
        </div>
      </div>
    </>
  )
}
