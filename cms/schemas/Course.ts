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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isHot',
      title: 'Hot?',
      type: 'boolean',
      description: 'Tick if the course is hot.',
    },
    {
      name: 'isNew',
      title: 'New?',
      type: 'boolean',
      description: 'Tick if the course is new.',
    },
    {
      name: 'isFree',
      title: 'Free?',
      type: 'boolean',
      description: 'Tick if the course is free.',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Must be a number. Put 0 if course is free.',
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => document?.isFree,
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
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => document?.isFree,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
}
