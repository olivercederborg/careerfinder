import { NextRouter } from 'next/router'

export const setCoursesUrlParams = (
  router: NextRouter,
  query: any | null,
  filteredCourseCategories: string[] | null,
  filteredCourseDifficulties: string[] | null,
  filteredCoursePricing: string[] | null
) => {
  if (
    filteredCourseCategories?.length ||
    filteredCourseDifficulties?.length ||
    filteredCoursePricing?.length
  ) {
    const courseCategoryUrlParams: string | undefined =
      filteredCourseCategories?.length
        ? filteredCourseCategories.join(',').toLowerCase()
        : undefined

    const difficultyUrlParams = filteredCourseDifficulties
      .join(',')
      .toLowerCase()

    const pricingUrlParams = filteredCoursePricing.join(',').toLowerCase()

    const queryParams = {
      ...(courseCategoryUrlParams && {
        categories: courseCategoryUrlParams,
      }),
      ...(filteredCourseDifficulties.length && {
        difficulties: difficultyUrlParams,
      }),
      ...(filteredCoursePricing.length && {
        pricing: pricingUrlParams,
      }),
    }

    router.push({
      pathname: `${query ? query.discipline : 'courses'}`,
      query: queryParams,
    })
  } else {
    router.push(query ? query?.discipline : '/courses', undefined, {
      shallow: true,
    })
  }
}
