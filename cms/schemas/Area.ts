import { NAME_FIELD, slugField } from './primitives'

export const Area = {
  title: 'Area',
  name: 'area',
  type: 'document',
  fields: [NAME_FIELD, slugField('name')],
}

export const ReferenceArea = {
  title: 'Area',
  name: 'area',
  type: 'reference',
  to: [{ type: 'area' }],
}
