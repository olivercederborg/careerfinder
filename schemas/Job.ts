import { ReferenceDiscipline } from './Discipline'
import { ReferenceArea } from './Area'
import { ReferenceRole } from './Role'
import { NAME_FIELD } from './primitives'

export const Job = {
  title: 'Job',
  name: 'job',
  type: 'document',
  fields: [
    NAME_FIELD,
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
