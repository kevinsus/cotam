import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { WaveHeaderSVG, WaveFooterSVG, BlogSvg, Nav } from '@/components/index'

const Home = () => {
  return (
    <div>
        <div className='cus-mainpage min-h-screen flex flex-col justify-center text-white'>
            <div className='absolute top-0 w-full'>
                <Nav/>
            </div>
            <div className='cus-page flex justify-center gap-15'>
                <div className='space-y-5 flex flex-col items-start justify-center'>
                    <h1 className='cus-h1'>Improve Your Course Outcome</h1>
                    <Link className='cus-lg-highlight-btn bg-white text-blue-600' href={"/login"} >Get Started</Link>
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
            <div className='absolute bottom-0 w-full h-1/4'>
                <WaveHeaderSVG/>
            </div>
        </div>

        <div className='text-blue-600 min-h-screen flex justify-center items-center'>
            {/* <div className='absolute w-3/5 z-0'>
                <BlogSvg />
            </div> */}
            <div className='cus-page cus-centerpage gap-10 z-1'>
                <h1 className='cus-h1'>What We Offer</h1>
                <div className='flex gap-5'>
                    <div className='cards max-w-100 text-black'>
                        <h5 className='cus-h5 font-bold'>Accurate Mapping</h5>
                        <Image 
                            src="/mapping.svg" 
                            width={150}
                            height={150}
                            alt="Blue docs"
                        />
                        <p>Our app uses bloom’s taxonomy to carefully map all the course outline</p>
                    </div>
                    <div className='cards max-w-100 text-black'>
                        <h5 className='cus-h5 font-bold'>Breakdown Analysis</h5>
                        <Image 
                            src="/analysis.svg" 
                            width={150}
                            height={150}
                            alt="Blue docs"
                        />
                        <p>Our app give a detail  analysis for each of the taxonomy level</p>
                    </div>
                    <div className='cards max-w-100 text-black'>
                        <h5 className='cus-h5 font-bold'>Multiple Course Comparison</h5>
                        <Image 
                            src="/comparison.svg" 
                            width={150}
                            height={150}
                            alt="Blue docs"
                        />
                        <p>Our app support multiple course comparison for a better understanding</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='text-blue-600 cus-page cus-centerpage gap-10'>
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

        <div>
            <div className='cus-centerpage cus-page gap-10'>
                <div className='cus-centerpage'>
                    <Link href={"/feedback"} className='text-white cus-lg-highlight-btn bg-blue-600'>Feedback</Link>
                    <p className='text-black'>Want to help improve out app? Share your Feedback</p>
                </div>
            </div>
            <div className='w-full h-30'>
                <WaveFooterSVG />
            </div>
            <div className='cus-mainpage cus-page text-white flex flex-col gap-10 font-bold'>
                <div className='py-10'>
                    <p>Course Outline Taxonomical Analysis and Mapping (COTAM) is a tool created by passionate students from Scouts Regiment.</p>
                    <p>This website serve as a general guide to understand the outcomes of a course. Please be aware that the information 
                        provided may change or require correction. It's important to verify any details with the university authorities 
                        before relying on them. We will not be responsible for any issues or misunderstandings that may arise.</p>
                </div>
                <div>@copyright 2025 by Kevin Susanto</div>
            </div>
        </div>
    </div>
  )
}

export default Home