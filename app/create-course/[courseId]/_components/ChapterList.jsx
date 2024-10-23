"use client";
import { CourseDataContext } from '@/app/_context/CourseData';
import React, { useContext, useState } from 'react'
import { CiClock2 } from "react-icons/ci";



function ChapterList() {

    const { courseInfo, setCourseInfo } = useContext(CourseDataContext);

    return (
        <div className=" p-6 my-6 space-y-4">
            <h1 className="text-3xl py-5">Chapter</h1>
            <div className="space-y-4">
                {
                    courseInfo?.courseOutput.map((chapter, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-10 items-center p-4 border ">
                            <div className="text-2xl text-slate-700 bg-primary h-10 w-10 text-center rounded-[50%]">
                                {index + 1}
                            </div>
                            <div className="space-y-2">
                                <h1 className=" text-xl font-bold text-slate-800">{chapter?.chapter_name}</h1>
                                <p className="text-sm capitalize text-slate-700">{chapter?.about}</p>
                                <div className="flex items-center gap-4 text-primary font-semibold">
                                    <CiClock2 />
                                    <p>{chapter?.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ChapterList
