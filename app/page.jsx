import React from 'react'
import Image from 'next/image'
import { WaveSVG } from '@/app/components/index'

const Home = () => {
  return (
    <div>
        <div className='cus-mainpage min-h-screen flex flex-col justify-center text-white'>
            <div className='cus-page flex justify-center gap-15'>
                <div className='space-y-5 flex flex-col items-start justify-center'>
                    <h1 className='cus-h1'>Improve Your Course Outcome</h1>
                    <button className='cus-lg-highlight-btn bg-white text-blue-600'>Get Started</button>
                    <p>We will help you find a pathway</p>
                </div>
                <div>
                    <Image 
                        src="/blue-docs.png" 
                        width={700}
                        height={700}
                        alt="Blue docs"
                    />
                </div>
            </div>
            <div className='absolute bottom-0 w-full h-1/2'>
                <WaveSVG/>
            </div>
        </div>

        <div className='text-blue-600 cus-page flex flex-col justify-center items-center gap-10'>
            <h1 className='cus-h1'>What We Offer</h1>
            <div className='flex gap-5'>
                <div className='cards text-black'>
                    <h5 className='cus-h5 font-bold'>Accurate Mapping</h5>
                    <Image 
                        src="/blue-docs.png" 
                        width={1000}
                        height={1000}
                        alt="Blue docs"
                    />
                    <p>Our app uses bloom’s taxonomy to carefully map all the course outline</p>
                </div>
                <div className='cards text-black'>
                    <h5 className='cus-h5 font-bold'>Breakdown Analysis</h5>
                    <Image 
                        src="/blue-docs.png" 
                        width={1000}
                        height={1000}
                        alt="Blue docs"
                    />
                    <p>Our app give a detail  analysis for each of the taxonomy level</p>
                </div>
                <div className='cards text-black'>
                    <h5 className='cus-h5 font-bold'>Multiple Course Comparison</h5>
                    <Image 
                        src="/blue-docs.png" 
                        width={1000}
                        height={1000}
                        alt="Blue docs"
                    />
                    <p>Our app support multiple course comparison for a better understanding</p>
                    </div>
            </div>
        </div>

        <div className='text-blue-600 cus-page flex flex-col justify-center items-center gap-10'>
            <h1 className='cus-h1'>How it works</h1>
            <video width="600" height="600" controls preload="none">
                <source src="/path/to/video.mp4" type="video/mp4" />
                    <track
                        src="/path/to/captions.vtt"
                        srcLang="en"
                        label="English"
                        />
                Your browser does not support the video tag.
            </video>
            <div className='text-black'>
                <p className='font-bold'>please check the video above to learn how to use the app</p>
                <p>Can't view it? Click here to download the video!</p>
            </div>
        </div>

        <div className='flex flex-col text-white justify-center items-center'>
            <button className='cus-lg-highlight-btn bg-blue-600'>Feedback</button>
            <p>Want to help improve out app? Share your Feedback</p>

            <p>Course Outline Taxonomical Analysis and Mapping (COTAM) is a tool created by passionate students from Scouts Regiment.</p>
            <p>This website serve as a general guide to understand the outcomes of a course. Please be aware that the information 
                provided may change or require correction. It's important to verify any details with the university authorities 
                before relying on them. We will not be responsible for any issues or misunderstandings that may arise.</p>
        </div>
    </div>
  )
}

export default Home