"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import Link from 'next/link';
import { CurrentUserCourse } from '@/app/_context/CurrentUserCourse';

const UserCourse = () => {
    const [courses, setCourses] = useState([]);
    const [del, setDel] = useState(false);
    const { user } = useUser();
    const { setCurrentCourse } = useContext(CurrentUserCourse);
    const [loading, setLoading] = useState(true);
    const dummyData = [{}, {}, {}, {}, {}]

    const fetchUserCourse = async () => {

        setLoading(true)
        const res = await db.select().from(CourseList).where(eq(user.primaryEmailAddress.emailAddress, CourseList.createdBy));
        setCourses(res);
        setCurrentCourse(res);
        setLoading(false)

    }

    useEffect(() => {
        user && fetchUserCourse();
    }, [user, del])

    console.log(loading);
    


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 '>
            {
                loading ?
                    dummyData.map((ele,idx) => {
                       return(
                         <div key={idx} className='h-[310px] w-[100%] bg-gray-200 animate-pulse duration-1000 md:w-[380px] border rounded-lg p-3 flex flex-col gap-4 hover:shadow-lg  cursor-pointer'>
                        </div>
                       )
                    })
                    :
                    courses.map((course, idx) => {
                        return (
                            <Link key={idx} href={`/course/${course.courseId}`}>
                                <CourseCard course={course} setDel={() => { setDel(!del) }} />
                            </Link>

                        )
                    })
            }
        </div>
    )
}

export default UserCourse
