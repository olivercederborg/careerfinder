import { ReferenceDiscipline } from './Discipline'
import { ReferenceArea } from './Area'
import { ReferenceRole } from './Role'
import { NAME_FIELD, slugField } from './primitives'

export const Job = {
  title: 'Job',
  name: 'job',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
    ReferenceDiscipline,
    ReferenceArea,
    ReferenceRole,
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
