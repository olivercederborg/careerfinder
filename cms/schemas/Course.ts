import { NAME_FIELD, slugField } from './primitives'
import { ReferenceDiscipline } from './Discipline'

export const Course = {
  title: 'Course',
  name: 'course',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
    ReferenceDiscipline,
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
      name: 'publisherImage',
      title: 'Publisher Image',
      type: 'image',
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: (Rule) => {
        return Rule.uri({ scheme: ['http', 'https'] })
      },
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
