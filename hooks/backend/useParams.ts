import { useRouter } from 'next/router'
import { pascalCase } from 'change-case'

export function useParams() {
  const router = useRouter()

  const [name, id] = (router.query.params as string[]) ?? []

  return { name: pascalCase(name ?? ''), id }
}
