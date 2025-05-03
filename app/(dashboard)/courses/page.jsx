'use client'

import React, { useState, useEffect, useRef } from 'react'

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
        data.courseExist.forEach(element => {
            // Only add data when its a unique courses
            if (!courses.has(element._id)) {
                setCourse(courses.set(element._id, element))
            }
        });
    } 

    const [selectCourseId, setSelectCourseId] = React.useState('')

    return (
        <div className='min-h-screen'>
            <div className='bg-blue-200 rounded-b-2xl flex flex-col items-center space-y-8 p-10'>
                
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
            <div className='flex py-10 space-x-10 cus-page h-190'>
                <div className='flex flex-col h-full items-center space-y-6 w-full'>
                    <input 
                        placeholder='Search for a course...' 
                        id="search"
                        name="search"
                        type="search"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full"
                    />
                    <div className='w-full h-full bg-white border border-gray-300 rounded-md shadow-md p-4 space-y-2'>
                        {courses.size === 0 && <p className="text-gray-400 text-lg">No courses fetched yet.</p>}
                        {[...courses.entries()].map(([key, course]) => (
                            <div key={key} onClick={() => setSelectCourseId(course._id)} className='cursor-pointer hover:bg-blue-100 p-2 rounded-md transition border-2 border-blue-200'>
                                <div className='font-semibold text-blue-800'>{course.course}</div>
                                <div className='text-sm text-gray-600'>{course.subject}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full bg-white border border-gray-300 rounded-md shadow-md p-4'>
                    {selectCourseId === '' && <p className='text-gray-400 text-lg flex items-center h-full justify-center'>Please select a course</p>}
                    {selectCourseId !== '' && 
                        <div>
                            <div className='text-xl font-bold text-blue-900'>{courses.get(selectCourseId).course}</div>
                            <div className='text-gray-700 text-sm mb-4'>{courses.get(selectCourseId).subject} - Term {courses.get(selectCourseId).term} - {courses.get(selectCourseId).year} </div>

                            <div className='text-xl font-bold text-blue-900'>Course Description</div>
                            <div>{courses.get(selectCourseId).descriptions}</div>
                            
                            <div className='text-xl font-bold text-blue-900'>Course Aim</div>
                            <div>{courses.get(selectCourseId).aims}</div>
                            
                            <div className='text-xl font-bold text-blue-900'>Course Outcomes</div>
                            <ul>
                                {courses.get(selectCourseId).outcomes.map((outcome, index) => (
                                    <li key={index}>{outcome}</li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses
