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
