import React from 'react'
import Link from 'next/link'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Link
        className="absolute top-0 p-2 sm:px-5 text-[#657ead] hover:font-semibold"
        href="/assessment"
      >
        Go Back
      </Link> */}
      {children}
    </>
  )
}

export default layout
