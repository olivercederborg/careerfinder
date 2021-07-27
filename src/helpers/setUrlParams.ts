export const setCoursesUrlParams = (
  router: any,
  query: any,
  filteredCourseCategories: string[] | null,
  filteredCourseDifficulties: string[] | null,
  filteredCoursePricing: string[] | null
) => {
  if (
    filteredCourseCategories?.length ||
    filteredCourseDifficulties?.length ||
    filteredCoursePricing?.length
  ) {
    const courseCategoryUrlParams =
      filteredCourseCategories?.length &&
      filteredCourseCategories.join(',').replace(' ', '%20').toLowerCase()

    const difficultyUrlParams = filteredCourseDifficulties
      .join(',')
      .replace(' ', '%20')
      .toLowerCase()

    const pricingUrlParams = filteredCoursePricing.join(',').toLowerCase()

    if (
      courseCategoryUrlParams.length &&
      !difficultyUrlParams.length &&
      !pricingUrlParams.length
    ) {
      router.push(
        `${query.discipline}?categories=${courseCategoryUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      !courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      !pricingUrlParams.length
    ) {
      router.push(
        `${query.discipline}?difficulties=${difficultyUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      !courseCategoryUrlParams.length &&
      !difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(
        `${query.discipline}?pricing=${pricingUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    } else if (
      courseCategoryUrlParams.length &&
      difficultyUrlParams.length &&
      pricingUrlParams.length
    ) {
      router.push(
        `${query.discipline}?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
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
        `${query.discipline}?difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
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
        `${query.discipline}?categories=${courseCategoryUrlParams}&pricing=${pricingUrlParams}`,
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
        `${query.discipline}?categories=${courseCategoryUrlParams}&difficulties=${difficultyUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  } else if (
    !filteredCourseCategories?.length &&
    !filteredCourseDifficulties?.length &&
    !filteredCoursePricing?.length
  ) {
    router.push(query?.discipline, undefined, { shallow: true })
  }
}

export const setSimpleCoursesUrlParams = (
  router: any,
  filteredCourseDifficulties: string[] | null,
  filteredCoursePricing: string[] | null
) => {
  if (filteredCourseDifficulties?.length || filteredCoursePricing?.length) {
    const difficultyUrlParams = filteredCourseDifficulties
      .join(',')
      .replace(' ', '%20')
      .toLowerCase()

    const pricingUrlParams = filteredCoursePricing.join(',').toLowerCase()

    if (difficultyUrlParams.length && !pricingUrlParams.length) {
      router.push(`?difficulties=${difficultyUrlParams}`, undefined, {
        shallow: true,
      })
    } else if (!difficultyUrlParams.length && pricingUrlParams.length) {
      router.push(`?pricing=${pricingUrlParams}`, undefined, {
        shallow: true,
      })
    } else if (difficultyUrlParams.length && pricingUrlParams.length) {
      router.push(
        `?difficulties=${difficultyUrlParams}&pricing=${pricingUrlParams}`,
        undefined,
        {
          shallow: true,
        }
      )
    }
  } else if (
    !filteredCourseDifficulties.length &&
    !filteredCoursePricing.length
  ) {
    router.push('/courses', undefined, { shallow: true })
  }
}
