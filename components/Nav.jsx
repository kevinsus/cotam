import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className='flex justify-end p-5 gap-5'>
        <Link className='cus-lg-highlight-btn bg-white text-blue-600' href={"/login"} >Login</Link>
        <Link className='cus-lg-highlight-btn bg-white text-blue-600' href={"/register"} >Register</Link>
    </div>
  )
}

export default Nav