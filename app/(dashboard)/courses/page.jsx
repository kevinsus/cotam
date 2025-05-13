'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import bt_data from '@/bloomsTaxonomy/data.json'

const dropdownOptions = {
    year: ['2025', '2024', '2023'],
    term: ['Term 1', 'Term 2', 'Term 3'],
    subject: [
        "ACCT", "ACTL", "AERO", "AGSM", "ANAT", "ARCH", "ARTS", "ATSI", "AVIA", "AVIG",
        "BABS", "BEES", "BEIL", "BENV", "BINF", "BIOC", "BIOM", "BIOS", "BIOT", "BLDG",
        "CDEV", "CEIC", "CHEM", "CLIM", "CODE", "COMD", "COMM", "COMP", "CONS", "CRIM",
        "CRTV", "CVEN", "DATA", "DESN", "DIET", "DPBS", "DPDE", "DPGE", "DPHU", "DPST",
        "ECON", "EDST", "ELEC", "ENGG", "ENTR", "ENVS", "EXCH", "EXPT", "FADA", "FINS",
        "FOOD", "GENC", "GENE", "GENL", "GENM", "GENS", "GENY", "GEOL", "GEOS", "GMAT",
        "GSBE", "GSOE", "HDAT", "HESC", "HLTH", "HUML", "HUMS", "IDES", "IEST", "INFS",
        "INST", "INTA", "INTD", "JURD", "LAND", "LAWS", "LING", "MANF", "MARK", "MATH",
        "MATS", "MBAE", "MDCN", "MDIA", "MECH", "MERE", "MFAC", "MFIN", "MGMT", "MICR",
        "MINE", "MMAN", "MNGT", "MODL", "MSCI", "MTRN", "MUSC", "NCHR", "NEUR", "OBST",
        "OPTM", "PAED", "PATH", "PHAR", "PHCM", "PHRM", "PHSL", "PHTN", "PHYS", "PLAN",
        "PLTX", "POLS", "PPEC", "PSCY", "PSYC", "PTRL", "REGZ", "REST", "RISK", "SCIF",
        "SENG", "SLSP", "SOCA", "SOCF", "SOCW", "SOLA", "SOMS", "SOSS", "SPRC", "SRAP",
        "STAM", "SURG", "SUSD", "SWCH", "TABL", "TELE", "UDES", "VISN", "YENG", "ZZBU",
        "ZZEN", "ZZLJ", "ZZSC"
    ]
}

const Courses = () => {
    const [yearDropdown, setYearDropdown] = useState(false)
    const [termDropdown, setTermDropdown] = useState(false)
    const [subjectDropdown, setSubjectDropdown] = useState(false)

    const [year, setYear] = useState('Year')
    const [term, setTerm] = useState('Term')
    const [subject, setSubject] = useState('Subject')
    const [course, setCourse] = useState('')
    const [courses, setCourses] = useState(new Map)

    // Handle for closing tabs when clicked outside buttons
    const closeAllDropdowns = () => {
        setYearDropdown(false)
        setTermDropdown(false)
        setSubjectDropdown(false)
    }

    const dropdownRef = React.useRef(null)
    function handleClickOutside(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            closeAllDropdowns()
        }
    }
    
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle Input
    const setDropdownBtn = ( setDropdownFunc, item) => {
        setDropdownFunc(item)
        closeAllDropdowns()
    }
    
    const handleFilter = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year, term, course })
        })

        const data = await res.json()

        data.courseExist.map( (courses) => (
            courses["descriptions"] = `
            From self-driving cars and humanoid robots to breakthroughs in battery technology and genome sequencing, computer systems are transforming the world. At the heart of these innovations are computers executing instructions to solve complex problems.
            
            In this course, you will learn how to instruct computers to solve real-world problems. You'll explore computer architecture and mechanics, and discover how to translate problems into working programs.
            
            The concepts covered will lay the groundwork for your future studies in computing and may even shift how you think about everyday challenges.
            
            This is an introductory course in computer programming and Computer Science, designed as a foundation for further study in the field. Topics include:
            
            - Fundamental programming concepts  
            - Introduction to Computer Science  
            - The C programming language and use of a C compiler  
            - Programming style  
            - Program design and organisation  
            - Program testing and debugging  
            `
        ))
        data.courseExist.map( (courses) => (
            courses["aims"] = `
            The importance of this course lies in its role as the foundation of your programming journey, providing essential knowledge and skills vital for your success in the field. By focusing on proficiency in the high-level programming language C and fostering problem-solving abilities, this course equips you with the fundamental tools and mindset necessary to think like a programmer.
    
            As the first course in the program, it plays a crucial role in setting the stage for your future learning. It serves as a prerequisite for many of the core courses, ensuring that all students begin with a solid understanding of the fundamental concepts required to progress further. By establishing a common knowledge base and skills, this course ensures that everyone starts on an equal footing and can effectively tackle more advanced topics.
    
            This course intends to guide you through the initial stages of your programming education, imparting technical proficiency in C and the ability to approach problems systematically and think critically. By emphasizing problem-solving strategies, debugging techniques, and testing methodologies, the course aims to instill in you a resilient and adaptable mindset that will serve as a solid foundation for your future development as a programmer.
            `
        ))
        data.courseExist.map( (courses) => (
            courses["name"] = 'Programming Fundamentals'
        ) )
        data.courseExist.map( (courses) => (
            courses["handbook"] = 'https://www.handbook.unsw.edu.au/undergraduate/courses/2022/COMP3131'
        ) )

        data.courseExist.forEach(element => {
            // Only add data when its a unique courses
            if (!courses.has(element._id)) {
                setCourse(courses.set(element._id, element))
            }
        });
        
    } 

    // Analyze
    const [selectPage, setSelectPage] = React.useState('')
    const [selectCourseId, setSelectCourseId] = React.useState('')

    // Map to Bloom's Taxonomy, if match then highlight and store the matched keyword into a new map (for creating the graph)
    const bt_map = new Map()

    const mapOutcomeToBT = (outcome) => {
        let checkOneBtObj = false
        const bloomsDefinition = ["Creating", "Evaluating", "Analyzing", "Applying", "Understanding", "Remembering"]
        const outcomeMap = new Map()

        // Map all keywords in bloom's taxonomy to their definition as its value 
        for (const def of bloomsDefinition) {
            for (const word of bt_data[def]) {
                outcomeMap.set(word.toLowerCase(), def)
            }
        }

        return (
            <p>
                {outcome.split(" ").map((word, index) => {
                    const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '')
                    const category = outcomeMap.get(cleanWord)

                    if (category && !checkOneBtObj) {
                        checkOneBtObj = true
                        return (
                            <span>
                                <span key={index} className='font-bold text-blue-800 bg-amber-300'>
                                    {word}
                                </span>
                                {index < outcome.split(' ').length - 1 && ' '}
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <span key={index} >
                                    {word}
                                </span>
                                {index < outcome.split(' ').length - 1 && ' '}
                            </span>
                        )
                    }
                })}
            </p>
        ) 
    }

    return (
        <div className='h-screen'>
            <div className='bg-blue-200 rounded-b-2xl flex flex-col items-center pt-20 justify-center space-y-6 h-2/6'>
                
                <h3 className='cus-h3'>Add Course To List</h3>
                <input 
                    placeholder='Enter course code...'
                    id="course"
                    name="course"
                    type="course"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-2/5 bg-white"
                    onChange={(e) => setCourse(e.target.value)}
                />

                <div className='flex flex-wrap justify-center gap-8'>
                    <div className='relative' >
                        <button onClick={() => setYearDropdown(!yearDropdown)} className={`py-2 px-12 w-40 font-bold bg-white rounded-md border-2 border-blue-500`} >{year}</button>
                        { yearDropdown && (
                            <ul ref={dropdownRef} className='absolute z-10 overflow-auto w-full max-h-60 bg-white rounded-b-md shadow-xl'>
                                {dropdownOptions.year.map( (item) => (
                                    <li key={item} onClick={() => setDropdownBtn(setYear, item)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 ${year === item ? 'bg-blue-300' : 'bg-white'}`}
                                    >{item}</li>
                                ) )}
                            </ul>
                        )}
                    </div>

                    <div className='relative'>
                        <button onClick={() => setTermDropdown(!termDropdown)} className={`py-2 px-12 w-40 font-bold bg-white rounded-md border-2 border-blue-500`} >{term}</button>
                        { termDropdown && (
                            <ul ref={dropdownRef} className='absolute z-10 overflow-auto w-full max-h-60 bg-white rounded-b-md shadow-xl'>
                                {dropdownOptions.term.map( (item) => (
                                    <li key={item} onClick={() => setDropdownBtn(setTerm, item)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 ${term === item ? 'bg-blue-300' : 'bg-white'}`}
                                    >{item}</li>
                                ) )}
                            </ul>
                        )}
                    </div>

                    <div className='relative'>
                        <button onClick={() => setSubjectDropdown(!subjectDropdown)} className={`py-2 px-12 w-40 font-bold bg-white rounded-md border-2 border-blue-500`} >{subject}</button>
                        { subjectDropdown && (
                            <ul ref={dropdownRef} className='absolute z-10 overflow-auto w-full max-h-60 bg-white rounded-b-md shadow-xl'>
                                {dropdownOptions.subject.map( (item) => (
                                    <li key={item} onClick={() => setDropdownBtn(setSubject, item)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 ${subject === item ? 'bg-blue-300' : 'bg-white'}`}
                                    >{item}</li>
                                ) )}
                            </ul>
                        )}
                    </div>

                    <button onClick={handleFilter} className='bg-blue-800 text-white cus-lg-highlight-btn'>
                        Find
                    </button>
                </div>

            </div>
            <div className='flex py-10 space-x-10 cus-page h-4/6'>
                <div className='flex flex-col items-center space-y-6 w-1/3'>
                    <input 
                        placeholder='Search for a course...' 
                        id="search"
                        name="search"
                        type="search"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full"
                    />
                    <div className='w-full h-full overflow-auto bg-white border border-gray-300 rounded-md shadow-md p-4 space-y-2'>
                        {courses.size === 0 && <p className="text-gray-400 text-lg">No courses fetched yet.</p>}
                        {[...courses.entries()].map(([key, course]) => (
                            <div key={key} onClick={() => {setSelectCourseId(course._id), setSelectPage('')} } className={`cursor-pointer ${course._id === selectCourseId ? 'bg-blue-100' : 'bg-white'} hover:bg-blue-100 p-2 rounded-md transition border-2 border-blue-200`}>
                                <div className='font-semibold text-blue-800'>{course.course}</div>
                                <div className='text-sm text-gray-600'>{course.subject}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-2/3 bg-white border border-gray-300 rounded-md shadow-md px-4 pt-4 relative overflow-auto'>
                    { selectPage === '' && (
                        <>
                            {selectCourseId === '' && <p className='text-gray-400 text-lg flex items-center h-full justify-center'>Please select a course</p>}
                            {selectCourseId !== '' && 
                                <div className='space-y-4 h-full'>
                                    <div className='space-y-1 flex flex-col items-center'>
                                        <div className='text-2xl font-bold text-blue-900'>{courses.get(selectCourseId).course} - {courses.get(selectCourseId).name}</div>
                                        <div className='text-gray-700 text-sm'>{courses.get(selectCourseId).subject} - Term {courses.get(selectCourseId).term} - {courses.get(selectCourseId).year} </div>
                                    </div>
                                    <div>
                                        <div className='text-xl font-bold text-blue-900'>Course Description</div>
                                        <div>{courses.get(selectCourseId).descriptions}</div>
                                    </div>
                                    
                                    <div className='space-y-1'>
                                        <div className='text-xl font-bold text-blue-900'>Course Outcomes</div>
                                        <ul>
                                            {courses.get(selectCourseId).outcomes.map((outcome, index) => (
                                                <li key={index}>{`${index+1}) ${outcome}`}</li>
                                            ))}
                                        </ul>
                                    </div>
    
                                    <div className='space-y-1'>
                                        <div className='text-xl font-bold text-blue-900'>Course Aims</div>
                                        <div>{courses.get(selectCourseId).aims}</div>
                                    </div>
                                    <div id='space' className='h-1/3'></div>
                                    
                                    <div className='flex justify-end sticky bg-white bottom-0 border-t border-gray-200 py-4 gap-5'>
                                        <Link target='_blank' href={courses.get(selectCourseId).handbook} className='cus-lg-highlight-btn flex justify-center w-60 border-2'>See Handbook</Link>
                                        <button onClick={() => setSelectPage('analyse')} className='cus-lg-highlight-btn bg-blue-800 text-white flex justify-center w-60'>Analyse Course</button>
                                    </div>

                                </div>
                            }
                        </>
                    )}
                    {selectPage === 'analyse' &&
                        <div className='space-y-4 h-full'>
                            <div className='space-y-1 flex flex-col items-center'>
                                <div className='text-2xl font-bold text-blue-900'>{courses.get(selectCourseId).course} - {courses.get(selectCourseId).name}</div>
                                <div className='text-gray-700 text-sm'>{courses.get(selectCourseId).subject} - Term {courses.get(selectCourseId).term} - {courses.get(selectCourseId).year} </div>
                            </div>
                            <div className='space-y-1'>
                                <div className='text-xl font-bold text-blue-900'>Course Outcomes</div>
                                <ul>
                                    {courses.get(selectCourseId).outcomes.map((outcome) => (
                                        mapOutcomeToBT(outcome)
                                    ))}
                                    {/* {courses.get(selectCourseId).outcomes.map((outcome) => (
                                        outcome.split(" ").map((word, index) => (
                                            <p key={index} className={`${checkOutcomeBtdata(word) && 'font-bold text-blue-800' }`}>{word}</p>
                                        ))

                                        // <li key={index} className='text-md'>{`${index+1}) ${outcome}`}</li>
                                    ))} */}
                                </ul>
                            </div>

                            <div className='space-y-1'>
                                <div className='text-xl font-bold text-blue-900'>Mapping to Bloom's Taxonomy</div>
                            </div>

                            <div id='blank' className='h-1/3'></div>
                            
                            <div className='flex justify-end sticky bg-white bottom-0 border-t border-gray-200 py-4 gap-5'>
                                <button onClick={() => setSelectPage('')} className='cus-lg-highlight-btn border-2 flex justify-center w-60'>Back</button>
                                <button onClick={() => setSelectPage('Mapping')} className='cus-lg-highlight-btn bg-blue-800 text-white flex justify-center w-60'>Ask AI</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses
