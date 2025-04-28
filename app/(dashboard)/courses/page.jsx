'use client'

import React from 'react'

const Courses = () => {
    const [yearDropdown, setYearDropdown] = React.useState(false)
    const [termDropdown, setTermDropdown] = React.useState(false)
    const [subjectDropdown, setSubjectDropdown] = React.useState(false)

    const [year, setYear] = React.useState('Year')
    const [term, setTerm] = React.useState('Term')
    const [subject, setSubject] = React.useState('Subject')
    const [course, setCourse] = React.useState('')

    const setDropDownFunc = (setFunc, string, setDropdown, dropdownString) => {
        setFunc(`${string}`)
        setDropdown(!dropdownString)
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ year, term, course })
        })

        const data = await res.json();
        console.log(data)
    }

    return (
        <div className='cus-page min-h-screen'>
            <div className='bg-blue-200 px-5 py-20 rounded-2xl flex flex-col items-center gap-5'>
                <h2 className='cus-h2'>Add Course</h2>
                <div>
                    <label htmlFor="course"></label>
                    <input 
                    id="course"
                    name="course"
                    type="course"
                    className="cus-input-text bg-white"
                    onChange={(e) => setCourse(e.target.value)}
                    />
                </div>

                <div className='flex justify-around gap-20'>
                    <div className=' flex flex-col justify-center'>
                        <button onClick={() => setYearDropdown(!yearDropdown)} className='cus-lg-highlight-btn bg-white' >{year}</button>
                        { yearDropdown && (
                            <div>
                                <ul>
                                    {['2025', '2024', '2023'].map( (itemYear) => (
                                        <li key={itemYear} onClick={() => setDropDownFunc(setYear, itemYear, setYearDropdown, yearDropdown)}
                                            className={`cus-lg-highlight-btn shadow-2xl cursor-pointer ${year === itemYear ? 'bg-blue-300' : 'bg-white'}`}
                                        >{itemYear}</li>
                                    ) )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col justify-center'>
                        <button onClick={() => setTermDropdown(!termDropdown)} className='cus-lg-highlight-btn bg-white' >{term}</button>
                        { termDropdown && (
                            <div className='flex justify-center'>
                                <ul>
                                    {['Term 1', 'Term 2', 'Term 3'].map( (itemTerm) => (
                                        <li key={itemTerm} onClick={() => setDropDownFunc(setTerm, itemTerm, setTermDropdown, termDropdown)}
                                            className={`cus-lg-highlight-btn shadow-2xl cursor-pointer ${term === itemTerm ? 'bg-blue-300' : 'bg-white'}`}
                                        >{itemTerm}</li>
                                    ) )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col justify-center'>
                        <button onClick={() => setSubjectDropdown(!subjectDropdown)} className='cus-lg-highlight-btn bg-white' >{subject}</button>
                        { subjectDropdown && (
                            <div className='flex justify-center'>
                                <ul>
                                    {["ACCT", "ACTL", "AERO", "AGSM", "ANAT", "ARCH", "ARTS", "ATSI", "AVIA", "AVIG",
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
                                    "ZZEN", "ZZLJ", "ZZSC"].map( (subectItem) => (
                                        <li key={subectItem} onClick={() => setDropDownFunc(setSubject, subectItem, setSubjectDropdown, subjectDropdown)}
                                            className={`cus-lg-highlight-btn shadow-2xl cursor-pointer ${subject === subectItem ? 'bg-blue-300' : 'bg-white'}`}
                                        >{subectItem}</li>
                                    ) )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button onClick={handleFilter} className='bg-blue-800 text-white cus-lg-highlight-btn'>
                        Find
                    </button>
                </div>

            </div>
            <div className='flex py-10 space-x-10'>
                <div className='w-lg'>
                    <input 
                    placeholder='Search' 
                    id="search"
                    name="search"
                    type="search"
                    className="cus-input-text bg-white"
                    />
                </div>
                
                {/* Line separating this */}

                <div>
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    )
}

export default Courses