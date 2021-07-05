import { NAME_FIELD, slugField } from './primitives'

export const Role = {
  title: 'Role',
  name: 'role',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
    {
      name: 'salary',
      title: 'Salary',
      type: 'number',
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
    },
  ],
}

export const ReferenceRole = {
  title: 'Role',
  name: 'role',
  type: 'reference',
  to: [{ type: 'role' }],
}
