'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { WaveFooterSVG } from '@/components'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useSession, signIn } from 'next-auth/react'

const Register = () => {
    const register = () => {
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center overflow-hidden'>
            <div className='h-150 w-full absolute bottom-0 z-0'>
                <WaveFooterSVG />
            </div>

            <div className='z-1 cus-form-card bg-white flex justify-center items-center gap-10'>
                <div className='w-120'>
                    <div className='border bg-blue-100 rounded-md w-10 h-10 mx-auto'></div>
                    <h2 className='cus-form-header'>Create an account</h2>
                    <div>
                        <form onSubmit={register} method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <input 
                                    id="name"
                                    name="name"
                                    type="name" 
                                    required
                                    autoComplete="name"
                                    className="cus-input-text"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="cus-form-label">Email Address</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    required
                                    autoComplete="email"
                                    className="cus-input-text"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="cus-form-label">Password</label>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password" 
                                    autoComplete="current-password"
                                    className="cus-input-text"
                                />
                            </div>    

                            <div className='flex gap-4 items-center'>
                                <input id="terms" type="checkbox" required="" />
                                <label htmlFor="terms" className="text-sm">
                                    I accept the
                                    <a className="text-blue-500 font-bold" href="#"> Terms and Conditions</a>
                                </label>
                            </div>

                            <div>
                                <button type="submit" className='cus-form-btn'>Create an account</button>
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
                            <button className='cus-auth-btn' onClick={() => signIn('google', { callbackUrl: '/courses' })}><FcGoogle /></button>
                            <button className='cus-auth-btn' onClick={() => signIn('github', { callbackUrl: '/courses' })}><FaGithub /></button>
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="leading-6 cus-form-text">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
                <div>
                    <Image src="/register.svg" width={600} height={600} priority alt="Authentication" />
                </div>
            </div>
        </div>
    )
}

export default Register