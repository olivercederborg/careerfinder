import { NAME_FIELD } from './primitives'

export const Area = {
  title: 'Area',
  name: 'area',
  type: 'document',
  fields: [NAME_FIELD],
}

export const ReferenceArea = {
  title: 'Area',
  name: 'area',
  type: 'reference',
  to: [{ type: 'area' }],
}
