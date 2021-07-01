import { NAME_FIELD, slugField } from './primitives'

export const Role = {
  title: 'Role',
  name: 'role',
  type: 'document',
  fields: [NAME_FIELD, slugField('name')],
}

export const ReferenceRole = {
  title: 'Role',
  name: 'role',
  type: 'reference',
  to: [{ type: 'role' }],
}
