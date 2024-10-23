import React from 'react'
import { BookOpen } from 'lucide-react';
import { Clock } from 'lucide-react';
import DropDown from './DropDown';

const CourseCard = ({ course,setDel }) => {
    // console.log(course?.courseId);

    return (
        <div className='h-[310px] w-[100%] md:w-[380px] border rounded-lg p-3 flex flex-col gap-4 hover:shadow-lg duration-150 cursor-pointer'>
            <div className='w-full h-[70%] '>
                <img src={course?.bannerUrl} alt="courseBanner" className='w-full h-full object-fill rounded-lg ' />
            </div>
            <div className='space-y-1'>
                <h1 className='line-clamp-1 font-semibold'>
                    {course?.name}
                </h1>
                <p className='text-slate-500 text-sm'>
                    {course?.category}
                </p>
                <div className='flex justify-between text-primary font-semibold'>
                    <p className=' text-sm flex gap-2 justify-center items-center'>
                        <span><Clock size={15}/></span>
                        {course?.duration}
                    </p>
                    <div className=' text-sm flex gap-2 justify-center items-center'>
                        <span><BookOpen size={15} /></span>{course?.level}
                        <p><DropDown courseId={course?.courseId} setDel={setDel}/></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
