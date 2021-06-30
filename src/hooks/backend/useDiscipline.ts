import { Discipline } from '.prisma/client'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { ensureEndsWith } from 'lib/ensureEndsWith'

export function useDisciplines() {
  return useQuery<Discipline[]>('/api/discipline')
}

export function useDiscipline(id: string) {
  return useQuery<Discipline>(['/api/discipline', id])
}
