"use client"
import { CourseDataContext } from '@/app/_context/CourseData';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState, useContext } from 'react'
import CourseInfo from '../_components/CourseInfo';
import { BiCategory } from "react-icons/bi";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';





const page = ({ params }) => {

  const { user } = useUser();
  const { courseInfo, setCourseInfo } = useContext(CourseDataContext);
  const router = useRouter();


  const fetchCourseData = async () => {
    const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId, params?.courseId), (eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))));
    // console.log(result);

    // setCourseData(result[0]);
    setCourseInfo(result[0]);
  }

  useEffect(() => {
    fetchCourseData();

  }, [params, user])

  return (
    <div className="py-8 px-4 md:px-28 w-full">
      <h1 className="pb-6 mb-4 text-4xl font-semibold text-center">Congratulations your course is created!</h1>
      <div className=" shadow-sm border p-6 flex flex-col-reverse md:flex-row gap-16 ">
            <div className="w-full md:w-[50%] space-y-10">
                <h1 className="text-3xl font-bold  flex gap-8">
                    {courseInfo?.name}
                </h1>
                <div className="text-slate-500">
                    {courseInfo?.description}
                </div>
                <div className="flex flex-col gap-6 ">
                    <div className="flex gap-4 items-center cursor-pointer text-blue-700">
                        <BiCategory />
                        <span>
                            {courseInfo?.category}
                        </span>
                    </div>
                    <Button className='w-full' onClick={() => {
                        router.replace(`/dashboard`)
                    }}>Start</Button>
                </div>
            </div>
            <div>
                    <div className="w-full h-[200px] md:w-[35vw] md:h-[300px] cursor-pointer flex justify-center items-center text-8xl text-slate-600">
                        <img src={courseInfo?.bannerUrl} alt="img" className="w-full h-full object-contain"/>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default page

