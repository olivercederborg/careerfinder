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
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'US Dollars', value: 'USD' },
          { title: 'Euro', value: 'EUR' },
          { title: 'Pound Sterling', value: 'GBP' },
          { title: 'Canadian Dollars', value: 'CAD' },
          { title: 'Danish Kroner', value: 'DKK' },
          { title: 'Swedish Kroner', value: 'SEK' },
          { title: 'Norwegian Kroner', value: 'NOK' },
        ],
      },
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
