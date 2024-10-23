"use client"

import { CurrentUserCourse } from '@/app/_context/CurrentUserCourse';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

const Addcourse = () => {
  const { user } = useUser();
  const {currentCourse} = useContext(CurrentUserCourse);

  return (
    <div className='flex flex-col  md:flex-row gap-6 md:gap-0 md:justify-between'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Hello ,<span className='font-bold'> {user?.fullName}</span></h1>
        <p className='text-slate-600'>Create new course with AI, Share with friends and Earn from it</p>
      </div>
      <Link href={currentCourse?.length>=5 ? "/dashboard/upgrade":"/create-course"}>
        <Button >+ Create AI Course</Button>
      </Link>
    </div>
  )
}

export default Addcourse
