"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import HeaderD from './_components/HeaderD'
import { CurrentUserCourse } from '../_context/CurrentUserCourse'

function layout({ children }) {
    const [currentCourse,setCurrentCourse] = useState([]);
    return (
        <CurrentUserCourse.Provider value={{currentCourse,setCurrentCourse}}>
            <div className='flex'>
            <div className='hidden md:flex md:w-[250px] h-screen shadow-md'>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <HeaderD />
                <div className='py-8 md:py-16 px-4 md:px-10 h-[calc(100vh-80px)] overflow-y-scroll'>
                    {children}
                </div>
            </div>
        </div>
        </CurrentUserCourse.Provider>
    )
}

export default layout
