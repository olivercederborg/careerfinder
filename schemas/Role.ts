import { NAME_FIELD } from './primitives'

export const Role = {
  title: 'Role',
  name: 'role',
  type: 'document',
  fields: [NAME_FIELD],
}

export const ReferenceRole = {
  title: 'Role',
  name: 'role',
  type: 'reference',
  to: [{ type: 'role' }],
}
