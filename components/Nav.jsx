'use client'

import React from 'react'
import Link from 'next/link'

import { signOut, useSession } from 'next-auth/react'

const Nav = ({ className }) => {
    const { data: session } = useSession()

    return (
        <div>
            { session ? 
                <div className={`flex justify-end p-3 gap-5 ${className}`}>
                    <button className='cus-lg-highlight-btn bg-white text-blue-600' onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
                </div>
            : 
                <div className={`flex justify-end p-5 gap-5`}>
                    <Link className='cus-lg-highlight-btn bg-white text-blue-600' href={"/login"} >Login</Link>
                    <Link className='cus-lg-highlight-btn bg-white text-blue-600' href={"/register"} >Register</Link>
                </div>
            }
        </div>
    )
}

export default Nav