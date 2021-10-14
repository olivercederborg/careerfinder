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
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
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
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
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

  /**
   * Salary — `number`
   *
   *
   */
  salary?: number;

  /**
   * Time — `string`
   *
   *
   */
  time?: string;
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
   * Banner — `image`
   *
   *
   */
  banner?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `blockContent`
   *
   *
   */
  description?: BlockContent;

  /**
   * Course categories — `array`
   *
   *
   */
  courseCategories?: Array<SanityKeyedReference<CourseCategory>>;
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
   * Discipline — `reference`
   *
   *
   */
  discipline?: SanityReference<Discipline>;

  /**
   * Course categories — `array`
   *
   *
   */
  courseCategories?: Array<SanityKeyedReference<CourseCategory>>;

  /**
   * Publisher Image — `image`
   *
   *
   */
  publisherImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Publisher — `string`
   *
   *
   */
  publisher?: string;

  /**
   * Link — `url`
   *
   *
   */
  link?: string;

  /**
   * Difficulty — `string`
   *
   *
   */
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Expert";

  /**
   * Price — `string`
   *
   *
   */
  price?: string;

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
      asset: SanityReference<SanityImageAsset>;
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
