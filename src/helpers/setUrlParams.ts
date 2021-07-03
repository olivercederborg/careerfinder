export const setCoursesUrlParams = (
  router: any,
  query: any,
  filteredCourseCategories: string[] | null,
  filteredCourseDifficulties: string[] | null,
  filteredCoursePricing: string[] | null
) => {
  if (
    filteredCourseCategories.length ||
    filteredCourseDifficulties.length ||
    filteredCoursePricing.length
  ) {
    const courseCategoryUrlParams = filteredCourseCategories
      .join(',')
      .toLowerCase()

    const difficultyUrlParams = filteredCourseDifficulties
      .join(',')
      .toLowerCase()

    const pricingUrlParams = filteredCoursePricing.join(',').toLowerCase()

    if (
      courseCategoryUrlParams.length &&
      !difficultyUrlParams.length &&
      !pricingUrlParams.length
    ) {
      router.push(`?categories=${courseCategoryUrlParams}`, undefined, {
        shallow: true,
      })
    } else if (
      !courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      !pricingUrlParams.length
    ) {
      router.push(`?difficulties=${difficultyUrlParams}`, undefined, {
        shallow: true,
      })
    } else if (
      !courseCategoryUrlParams.length &&
      !difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(`?pricing=${pricingUrlParams}`, undefined, {
        shallow: true,
      })
    } else if (
      courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(
        `?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      !courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(
        `?difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      courseCategoryUrlParams.length &&
      !difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(
        `?categories=${courseCategoryUrlParams}&pricing=${pricingUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      !pricingUrlParams.length
    ) {
      router.push(
        `?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  } else if (
    !filteredCourseCategories.length &&
    !filteredCourseDifficulties.length &&
    !filteredCoursePricing.length
  ) {
    router.push(query?.id, undefined, { shallow: true })
  }
}
