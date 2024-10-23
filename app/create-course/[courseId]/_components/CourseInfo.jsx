"use client"

import { CourseDataContext } from '@/app/_context/CourseData';
import { Button } from '@/components/ui/button';
import React, { useContext , useState ,useEffect } from 'react'
import { BiCategory } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import EditCourseInfo from './EditCourseInfo';
import { date } from 'drizzle-orm/mysql-core';
import { storage } from '@/configs/fireBase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


const CourseInfo = () => {

    const { courseInfo, setCourseInfo } = useContext(CourseDataContext);
    const [bannerUrl, setBannerUrl] = useState(courseInfo?.bannerUrl);

    const onFileSelector =async(e) => {
        const file = e.target.files[0];
        // console.log(file);

        setBannerUrl(URL.createObjectURL(file));

        const FileName = Date.now() + '.jpg';
        const storageRef = ref(storage, FileName);
        await uploadBytes(storageRef, file).then((snapshot) => { 
            console.log("uploaded");  
        }).then(() => {
            getDownloadURL(storageRef).then(async(url) => {
                // console.log(url);
                await db.update(CourseList).set({bannerUrl:url}).where(eq(courseInfo.id,CourseList.id))
            })
        })

    }
    

    // console.log(courseInfo);
    

    return (
        <div className=" shadow-sm border p-6 flex flex-col-reverse md:flex-row gap-8 md:gap-16 ">
            <div className="w-full md:w-[50%] space-y-10">
                <h1 className="text-2xl md:text-3xl font-bold  flex gap-8">
                    {courseInfo?.name}
                    <EditCourseInfo />
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
                    <Button className='w-full'>Start</Button>
                </div>
            </div>
            <div>
                <label htmlFor="CourseImg">
                    <div className="w-full h-[200px] md:w-[35vw] md:h-[300px] cursor-pointer flex justify-center items-center text-8xl text-slate-600">
                        <img src={bannerUrl? bannerUrl : courseInfo?.bannerUrl} alt="img" className="w-full h-full object-contain"/>
                    </div>
                </label>
                <input type="file" name="CourseImg" id="CourseImg" className="opacity-0" onChange={onFileSelector}/>
            </div>
        </div>
    )
}

export default CourseInfo
