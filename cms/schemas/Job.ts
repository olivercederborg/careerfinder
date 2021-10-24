import { ReferenceDiscipline } from './Discipline'
import { ReferenceArea } from './Area'
import { ReferenceRole } from './Role'
import { NAME_FIELD, SEO_DESCRIPTION, SEO_TITLE, slugField } from './primitives'

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
      name: 'banner',
      title: 'Banner',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      title: 'Course categories',
      name: 'courseCategories',
      type: 'array',
      of: [
        {
          title: 'Course category',
          name: 'courseCategory',
          type: 'reference',
          to: [{ type: 'courseCategory' }],
        },
      ],
    },
    SEO_TITLE,
    SEO_DESCRIPTION,
  ],
}
