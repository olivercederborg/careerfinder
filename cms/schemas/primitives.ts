export const NAME_FIELD = {
  name: 'name',
  type: 'string',
}

export const slugField = (source: string) => ({
  title: 'Slug',
  name: 'slug',
  type: 'slug',
  options: {
    source,
    maxLength: 64,
  },
})

export const SEO_TITLE = {
  name: 'seoTitle',
  title: 'SEO Title',
  type: 'string',
  validation: (Rule) =>
    Rule.max(60).warning(
      `It is recommended to keep a title below 60 characters.`
    ),
}

export const SEO_DESCRIPTION = {
  name: 'seoDescription',
  title: 'SEO Description',
  type: 'text',
  validation: (Rule) =>
    Rule.max(160).warning(
      `It is recommended to keep a description below 160 characters.`
    ),
}
