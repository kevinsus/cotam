'use client'

import React from 'react'
import { WaveFooterSVG } from '@/components'
import Image from 'next/image'

// https://stackoverflow.com/questions/75105794/how-to-get-form-input-value-in-reactjs
const Feedback = () => {
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    // Send client side user input to route file on app router
    // handleSubmit = user's email and its feedbacks
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch ('/api/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            })

            if (!res.ok) {
                throw new Error('Something went wrong')
            } else {
                setEmail('');
                setMessage('');
            }
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center overflow-hidden'>
            <div className='h-150 w-full absolute bottom-0 z-0'>
                <WaveFooterSVG />
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
                    
                    <form onSubmit={handleSubmit} >
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
                                className="h-40 w-full resize-none cus-input-text">
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