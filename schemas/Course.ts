import { ReferenceCourseCategory } from './CourseCategory'
import { NAME_FIELD } from './primitives'

export const Course = {
  title: 'Course',
  name: 'course',
  type: 'document',
  fields: [
    NAME_FIELD,
    {
      title: 'Course categories',
      name: 'courseCategories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'courseCategory' }],
        },
      ],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'displayImage',
      title: 'Display Image',
      type: 'image',
    },
    {
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
