import { ReferenceDiscipline } from './Discipline'
import { ReferenceArea } from './Area'
import { NAME_FIELD, SEO_DESCRIPTION, SEO_TITLE, slugField } from './primitives'
import { ReferenceCourseCategory } from './CourseCategory'

export const Job = {
  title: 'Job',
  name: 'job',
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
    ReferenceDiscipline,
    ReferenceArea,
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
      of: [ReferenceCourseCategory],
    },
    SEO_TITLE,
    SEO_DESCRIPTION,
  ],
}
