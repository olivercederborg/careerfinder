import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
};

/**
 * Discipline
 *
 *
 */
export interface Discipline extends SanityDocument {
  _type: "discipline";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Area
 *
 *
 */
export interface Area extends SanityDocument {
  _type: "area";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Role
 *
 *
 */
export interface Role extends SanityDocument {
  _type: "role";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Job
 *
 *
 */
export interface Job extends SanityDocument {
  _type: "job";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Discipline — `reference`
   *
   *
   */
  discipline?: SanityReference<Discipline>;

  /**
   * Area — `reference`
   *
   *
   */
  area?: SanityReference<Area>;

  /**
   * Role — `reference`
   *
   *
   */
  role?: SanityReference<Role>;

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;

  /**
   * Courses — `array`
   *
   *
   */
  courses?: Array<SanityKeyedReference<Course>>;
}

/**
 * Course Category
 *
 *
 */
export interface CourseCategory extends SanityDocument {
  _type: "courseCategory";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Course
 *
 *
 */
export interface Course extends SanityDocument {
  _type: "course";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Course categories — `array`
   *
   *
   */
  courseCategories?: Array<SanityKeyedReference<CourseCategory>>;

  /**
   * Link — `url`
   *
   *
   */
  link?: string;

  /**
   * Price — `string`
   *
   *
   */
  price?: string;

  /**
   * Display Image — `image`
   *
   *
   */
  displayImage?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Author Image — `image`
   *
   *
   */
  authorImage?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Author — `string`
   *
   *
   */
  author?: string;

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type Documents =
  | Discipline
  | Area
  | Role
  | Job
  | CourseCategory
  | Course;
