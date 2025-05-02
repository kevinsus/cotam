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
    const [courses, setCourses] = useState([])

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
        setCourses(data.courseExist)
        console.log(data.courseExist)
    } 

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
            <div className='flex py-10 space-x-10 cus-page'>
                <div className='w-lg'>
                    <input 
                    placeholder='Search' 
                    id="search"
                    name="search"
                    type="search"
                    className="cus-input-text bg-white"
                    />
                </div>
                
                <div className=''>
                {courses.map((course, index) => (
                    <div key={index}>
                        <h2 className='cus-h3'>{course.course}</h2>
                        <h2 className='cus-h3'>{course.year}</h2>
                        {course.outcomes.map((outcome, i) => (
                            <div key={i}>{outcome}</div>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Courses
