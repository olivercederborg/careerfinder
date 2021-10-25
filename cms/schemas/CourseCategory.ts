import { NAME_FIELD, SEO_DESCRIPTION, SEO_TITLE, slugField } from './primitives'

export const CourseCategory = {
  title: 'Course Category',
  name: 'courseCategory',
  type: 'document',
  fields: [NAME_FIELD, slugField('name')],
}

export const ReferenceCourseCategory = {
  title: 'Course Category',
  name: 'courseCategory',
  type: 'reference',
  to: [{ type: 'courseCategory' }],
}
