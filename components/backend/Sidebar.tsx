import Link from 'next/link'

function Sidebar() {
  return (
    <div className="sticky top-0 h-screen flex flex-col bg-gray-100 py-8 px-4 space-y-4 border-r">
      <Link href="/backend/discipline">
        <a>Discipline</a>
      </Link>
      <Link href="/backend/area">
        <a>Area</a>
      </Link>
      <Link href="/backend/role">
        <a>Role</a>
      </Link>
      <Link href="/backend/job">
        <a>Job</a>
      </Link>
    </div>
  )
}

export default Sidebar
