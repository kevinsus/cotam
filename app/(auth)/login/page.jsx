'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useSession, signIn, signOut } from 'next-auth/react'

const Login = () => {
    const { data: session } = useSession()

    const login = () => {

    }

    return (
        <div className="px-10 grid md:grid-cols-2 items-center min-h-screen">
            <div className='cus-form-card'>
                <div>
                    <div className='border bg-blue-100 rounded-md w-10 h-10 mx-auto'></div>
                        <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div>
                        <form onSubmit={login} method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="cus-input-text"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                    </label>
                                    <div className="text-sm">
                                        <Link href="reset/password" className="cus-form-text">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="cus-input-text"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <button type="submit" className="cus-form-btn">Sign in</button>
                            </div>
                        </form>
                        <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className='flex gap-4 mt-2'>
                            <button className='cus-auth-btn' onClick={() => signIn('google', { callbackUrl: '/courses' })} ><FcGoogle /></button>
                            <button className='cus-auth-btn' onClick={() => signIn('github', { callbackUrl: '/courses' })} ><FaGithub /> </button>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            Dont have an account?{' '}
                            <Link href="/register" className="leading-6 cus-form-text">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 flex justify-center items-center">
                <Image src="/login.jpg" width={600} height={600} className="w-full h-auto" priority alt="Authentication" />
            </div>
        </div>
    )
}

export default Login