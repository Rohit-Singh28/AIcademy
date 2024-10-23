"use client";

import { CourseDataContext } from '@/app/_context/CourseData';
import React, { useContext } from 'react'
import { GiNetworkBars } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { BsBook } from "react-icons/bs";
import { CiYoutube } from "react-icons/ci";


const CourseDetails = () => {

    const { courseInfo, setCourseInfo } = useContext(CourseDataContext);

    return (
        <div className="shadow-sm border p-6 my-6 grid grid-cols-2 items-center  lg:grid-cols-4 flex-col md:flex-row gap-8">
            <div className="flex gap-4 items-center">
                <div className="text-2xl text-slate-700">
                    <GiNetworkBars />
                </div>
                <div>
                    <h1 className="text-slate-700 text-sm">Skills Level</h1>
                    <p className="text-lg font-semibold capitalize">{courseInfo?.level}</p>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="text-2xl text-slate-700">
                <IoMdTime />
                </div>
                <div>
                    <h1 className="text-slate-700 text-sm">Duration</h1>
                    <p className="text-lg font-semibold capitalize">{courseInfo?.duration}</p>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="text-2xl text-slate-700">
                    <BsBook />
                </div>
                <div>
                    <h1 className="text-slate-700 text-sm">No of Chapter</h1>
                    <p className="text-lg font-semibold capitalize">{courseInfo?.courseOutput.length}</p>
                </div>
            </div>
           
            <div className="flex gap-4 items-center">
                <div className="text-2xl text-slate-700">
                    <CiYoutube />
                </div>
                <div>
                    <h1 className="text-slate-700 text-sm">Video Included</h1>
                    <p className="text-lg font-semibold capitalize">{courseInfo?.videoIncluded}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
