import { NAME_FIELD } from './primitives'

export const Discipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'document',
  fields: [NAME_FIELD],
}

export const ReferenceDiscipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'reference',
  to: [{ type: 'discipline' }],
}
