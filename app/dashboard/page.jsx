"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Addcourse from './_components/Addcourse'
import HeaderD from './_components/HeaderD'
import UserCourse from './_components/UserCourse'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-8 w-full '>
        <Addcourse/>
        <UserCourse/>
    </div>
  )
}

export default Dashboard
