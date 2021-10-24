import { NAME_FIELD, SEO_DESCRIPTION, SEO_TITLE, slugField } from './primitives'

export const Discipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'document',
  fields: [
    NAME_FIELD,
    slugField('name'),
    {
      title: 'Hero Title',
      name: 'heroTitle',
      type: 'string',
      description:
        'Hero Title for course category page tied to this discipline.',
    },
    {
      title: 'Hero Subtitle',
      name: 'heroSubtitle',
      type: 'string',
      description:
        'Hero Subtitle for course category page tied to this discipline.',
    },
    {
      description:
        'SEO Title for course category page tied to this discipline.',
      ...SEO_TITLE,
    },
    {
      description:
        'SEO Description for course category page tied to this discipline.',
      ...SEO_DESCRIPTION,
    },
  ],
}

export const ReferenceDiscipline = {
  title: 'Discipline',
  name: 'discipline',
  type: 'reference',
  to: [{ type: 'discipline' }],
}
