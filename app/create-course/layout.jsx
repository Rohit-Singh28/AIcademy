"use client"

import React, { useState } from 'react'
import Header from '../_components/Header'
import { UserInpContext } from '../_context/UserInpContext'
import { CourseDataContext } from '../_context/CourseData';

function layout({ children }) {
  const [userInputData,setUserInputData] = useState();
  const [courseInfo,setCourseInfo] = useState();

  return (

    <div >
      <UserInpContext.Provider value={{userInputData,setUserInputData}}>
      <CourseDataContext.Provider value={{courseInfo,setCourseInfo}}>
      <Header />
        <div className='py-8  md:px-10'>
          {children}
        </div>
      </CourseDataContext.Provider>
      </UserInpContext.Provider>
    </div>
  )
}

export default layout
