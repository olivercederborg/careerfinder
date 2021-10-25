// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import { BlockContent } from './BlockContent'

// Models
import { Discipline } from './Discipline'
import { Area } from './Area'
import { Job } from './Job'
import { CourseCategory } from './CourseCategory'
import { Course } from './Course'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    BlockContent,

    // Models
    Discipline,
    Area,
    Job,
    CourseCategory,
    Course,
  ]),
})
