import { NAME_FIELD, slugField } from './primitives'

export const Course = {
  title: 'Course',
  name: 'course',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
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
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: (Rule) => {
        return Rule.uri({ scheme: ['http', 'https'] })
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
