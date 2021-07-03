import { NAME_FIELD, slugField } from './primitives'

export const CourseCategory = {
  title: 'Course Category',
  name: 'courseCategory',
  type: 'document',
  fields: [NAME_FIELD, slugField('name')],
}
