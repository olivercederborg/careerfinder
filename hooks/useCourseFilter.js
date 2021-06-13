import { useState } from 'react'

const useFilters = () => {
  const [filteredCourses, setFilteredCourses] = useState([])

  const useFilterByCategory = (initialCourses, filterValues) => {
    const extractedCourses = initialCourses.filter((course) => {
      for (const value of filterValues) {
        if (
          course.categories
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return course
        }
      }
    })

    setFilteredCourses(() => extractedCourses)
  }

  return { filteredCourses, useFilterByCategory }
}

export default useFilters
