'use client'
import React from 'react'

const AiReasoning = ({ data, clo }) => {
    const [cardFlip, setCardFlip] = React.useState(false)
    const [analyseData, setAnalyseData] = React.useState('')
    
    const handleCardClick = async () => {
        if (!cardFlip) {
            setCardFlip(true)
            setAnalyseData("Loading...")

            // Analyse reasoning using AI API
            // https://www.huit.harvard.edu/news/ai-prompts
            const prompt = `
                This project is about mapping Course Outcome of a university course into bloom's taxonomy.
                The program has identified the keywords of the CLO (course learning outcome) to their respective
                taxonomy level, into an array showed here: ${data}. Note that in this data, there are levels which
                have no keywords identified at all, and there are also keywords which are doubled.
                For example, the 'applying' level may have multiple 'apply' keywords identified in the outcome,
                hence it may have multiple same keywords in that data array, so please don't get confused from this.

                I want the output to be around 7-10 sentences (10 max sentences) or a max words of 500 words.
                I want the output to discuss what this means based on the data above, and this CLO: ${clo}.

                For example, you could say that if the data showed that all the CLO gives the result in "remember" taxonomy level,
                then this course is heavily based on THEORY BASED (result). and then justify the reasoning. If there are mutliple
                levels identified, then you need to have still have one single result and then summarize this and tell reasoning
                of why the result is that.

                So to summarize:
                - DO the output to be around 7-10 sentences
                - DO the output to discuss what this means based on the data above, and this CLO
                - DO give the result, and the summary, reasoning.
                - DO NOT give me your comments, just give the result as it will be shown directly to the app.
                (You dont need to give me you comments like "Okay I understand", instead just give me the answer).
                - DO be consistent in you answer
                - DO NOT refer to our data (such as your commnents like "based on the provided CLO")
                - DO NOT refer to out representation data ("represented as [object Map]) as it will confuse the audience

                The audience is going to be students, but mostly will be educators, like lecturers, course admin, or tutors.
                Please adjust you result, tone, language based on this.
            `
            try {
                const response = await fetch('/api/gemini', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                })

                const data = await response.json()
                if (response.ok) {
                    setAnalyseData(data.res)
                }
            } catch (error) {
                console.error(error)
                setAnalyseData("An error has been identified! Unfortunately this means that we cannot ask our AI for our results. Please try again later.")
            }
        } else {
            setCardFlip(false)
        }
    }

    // https://play.tailwindcss.com/UBtfBhk8d7
    return (
        <div className='relative w-4/5 h-100 cursor-pointer' onClick={handleCardClick} >
            <div className={`transition-all duration-500 [transform-style:preserve-3d] w-full h-full ${cardFlip ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'} `}>
                <div className='absolute cards w-full h-full backface-hidden bg-blue-100'>
                    <div className='text-lg font-bold'>Ask AI</div>
                    <p className='absolute bottom-5 right-10 text-gray-700'>Click Me</p>
                </div>
                <div className='absolute cards [transform:rotateY(180deg)] w-full h-full bg-blue-100 backface-hidden'>
                    <div className='text-lg font-bold'>What does this mean?</div>
                    <p>{analyseData}</p>
                </div>
            </div>
        </div>
    )
}

export default AiReasoning