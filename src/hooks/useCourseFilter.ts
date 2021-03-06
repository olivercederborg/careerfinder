import { useState } from 'react'

const filterByCategory = (coursesInput: any[], categoryValues) => {
  return coursesInput.filter((course) => {
    for (const value of categoryValues) {
      for (const category of course.courseCategories) {
        if (
          category.name.toString().toLowerCase().includes(value.toLowerCase())
        ) {
          return course
        }
      }
    }
  })
}

const filterByDifficulty = (coursesInput: any[], difficultyValues) => {
  return coursesInput.filter((course) => {
    for (const value of difficultyValues) {
      if (
        course.difficulty.toString().toLowerCase().includes(value.toLowerCase())
      ) {
        return course
      }
    }
  })
}

const filterByPrice = (coursesInput: any[], priceValues) => {
  return coursesInput.filter((course) => {
    for (const value of priceValues) {
      switch (value) {
        case 'Free':
          if (course.isFree) return course
          break
        case 'Paid':
          if (!course.isFree) return course
          break
      }
    }
  })
}

const filterBySearch = (coursesInput: any[], query: string) => {
  return coursesInput.filter((course) =>
    course.name.toLowerCase().includes(query.toLowerCase())
  )
}

const useFilters = () => {
  const [filteredCourses, setFilteredCourses] = useState([])

  const useFilter = (
    initialCourses: any[],
    categoryValues: string[] | null,
    difficultyValues: string[] | null,
    priceValues: string[] | null
  ) => {
    if (categoryValues && difficultyValues && priceValues) {
      let filtered = []

      filtered = filterByCategory(initialCourses, categoryValues)
      filtered = filterByDifficulty(filtered, difficultyValues)
      filtered = filterByPrice(filtered, priceValues)

      setFilteredCourses(() => filtered)
    } else if (!categoryValues && difficultyValues && priceValues) {
      let filtered = []

      filtered = filterByDifficulty(initialCourses, difficultyValues)
      filtered = filterByPrice(filtered, priceValues)

      setFilteredCourses(() => filtered)
    } else if (categoryValues && !difficultyValues && priceValues) {
      let filtered = []

      filtered = filterByCategory(initialCourses, categoryValues)
      filtered = filterByPrice(filtered, priceValues)

      setFilteredCourses(() => filtered)
    } else if (categoryValues && difficultyValues && !priceValues) {
      let filtered = []

      filtered = filterByCategory(initialCourses, categoryValues)
      filtered = filterByDifficulty(filtered, difficultyValues)

      setFilteredCourses(() => filtered)
    } else if (categoryValues && !difficultyValues && !priceValues) {
      let filtered = filterByCategory(initialCourses, categoryValues)

      setFilteredCourses(() => filtered)
    } else if (!categoryValues && difficultyValues && !priceValues) {
      let filtered = filterByDifficulty(initialCourses, difficultyValues)

      setFilteredCourses(() => filtered)
    } else if (!categoryValues && !difficultyValues && priceValues) {
      let filtered = filterByPrice(initialCourses, priceValues)

      setFilteredCourses(() => filtered)
    } else {
      setFilteredCourses(() => initialCourses)
    }
  }

  const useSearchFilter = (courses: any[], query?: string) => {
    if (query) {
      return filterBySearch(courses, query)
    }
    return []
  }

  return { filteredCourses, useFilter, useSearchFilter }
}

export default useFilters
