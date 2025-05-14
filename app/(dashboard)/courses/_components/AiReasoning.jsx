'use client'
import React from 'react'

const AiReasoning = ({ data }) => {
    const [cardFlip, setCardFlip] = React.useState(false)
    const [analyseData, setAnalyseData] = React.useState('')

    const handleCardClick = () => {
        setCardFlip(!cardFlip)

        if (!cardFlip) {
            // Analyse reasoning using AI API

            setAnalyseData('AI Reason is bla')
        }
    }

    // https://play.tailwindcss.com/UBtfBhk8d7
    return (
        <div className='relative w-1/2 h-100 cursor-pointer' onClick={handleCardClick} >
            <div className={`transition-all duration-500 [transform-style:preserve-3d] w-full h-full ${cardFlip ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'} `}>
                <div className='absolute cards w-full h-full backface-hidden'>
                    <div className='text-lg font-bold text-blue-900'>AI Reasoning</div>
                    <p className='absolute bottom-5 right-10 text-gray-500'>Click Me</p>
                </div>
                <div className='absolute cards [transform:rotateY(180deg)] w-full h-full backface-hidden'>
                    <p>{analyseData}</p>
                </div>
            </div>
        </div>
    )
}

export default AiReasoning