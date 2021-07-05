import { NAME_FIELD, slugField } from './primitives'

export const Discipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'document',
  fields: [NAME_FIELD, slugField('name')],
}

export const ReferenceDiscipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'reference',
  to: [{ type: 'discipline' }],
}
