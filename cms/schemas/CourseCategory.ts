import { NAME_FIELD, SEO_DESCRIPTION, SEO_TITLE, slugField } from './primitives'

export const CourseCategory = {
  title: 'Course Category',
  name: 'courseCategory',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
    {
      title: 'Hero Title',
      name: 'heroTitle',
      type: 'string',
    },
    {
      title: 'Hero Subtitle',
      name: 'heroSubtitle',
      type: 'string',
    },
    SEO_TITLE,
    SEO_DESCRIPTION,
  ],
}
