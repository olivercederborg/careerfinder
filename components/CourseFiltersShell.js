export default function CourseFiltersShell({ children }) {
  return (
    <>
      <section className="rounded-2xl gap-y-8 gap-x-10 container flex flex-wrap justify-between p-6 shadow-lg">
        {children}
      </section>
    </>
  )
}
