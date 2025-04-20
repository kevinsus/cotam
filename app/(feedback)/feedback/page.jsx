'use client'

import React from 'react'
import { WaveFooterSVG } from '@/components'
import Image from 'next/image'
import { Resend } from 'resend'

// https://stackoverflow.com/questions/75105794/how-to-get-form-input-value-in-reactjs
const Feedback = () => {
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const sendFeedback = () => {

    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center overflow-hidden'>
            <div className='h-150 w-full absolute bottom-0 z-0'>
                <WaveFooterSVG />
                {/* <div className='bg-blue-800 p-20'></div> */}
            </div>


            <div className='z-1 cus-form-card bg-white flex justify-center items-center'>
                <div>
                    <div className='border bg-blue-100 rounded-md w-10 h-10 mx-auto'></div>
                    <h2 className='my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Feedback
                    </h2>
                    <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share
                        with us!
                    </p>
                    <form onSubmit={sendFeedback}>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm leading-7 text-gray-600">Email</label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="cus-input-text"
                                    onChange={( e ) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                required 
                                onChange={(e) => setMessage(e.target.value)} 
                                value={message}
                                className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-800 focus:ring-2 focus:ring-blue-800">
                            </textarea>
                        </div>
                        <button type="submit" className="cus-form-btn">Send</button>
                        <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
                    </form>
                </div>
                <div>
                    <Image src={'/feedback.svg'} height={600} width={600} priority alt="Authentication" />
                </div>
            </div>
        </div>
    )
}

export default Feedback