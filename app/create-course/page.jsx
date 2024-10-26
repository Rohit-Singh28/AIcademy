"use client"
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { BiCategory } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import Selector from './_components/Selector';
import Description from './_components/Description';
import SelectOpt from './_components/SelectOpt';
import { UserInpContext } from '../_context/UserInpContext';
import { GenerateCourseLayoutAI } from '@/configs/AiModel';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { v1 as uuidv1 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Loading from './_components/Loading';
import axios from 'axios';
require('dotenv').config()

const page = () => {


    const { userInputData, setUserInputData } = useContext(UserInpContext);
    const [courseLayout, setCourseLayout] = useState();
    const[loading,setLoading] = useState(false);
    const {user} = useUser();
    const router = useRouter();

    // console.log(userInputData);


    const level = [
        {
            indx: 1,
            icon: <BiCategory />,
            title: "Category",
        },
        {
            indx: 2,
            icon: <FaRegLightbulb />,
            title: "Topic & desc",
        },
        {
            indx: 3,
            icon: <HiOutlineClipboardDocumentCheck />,
            title: "Options",
        }]

    const [active, setActive] = useState(1);
    // console.log(active);

    const handleNext = () => {
        if (active < 3) {
            setActive(active + 1);
        }
    }

    const handlePrev = () => {
        if (active > 1) {
            setActive(active - 1);
        }
    }


    const checkStatus = () => {
        if (active == 0) {
            return true;
        }
        else if (active == 1 && (userInputData?.category == undefined || userInputData?.category?.length == 0)) {
            return true;
        }
        else if (active == 2 && (userInputData?.course == undefined || userInputData?.description == undefined)) {
            return true;
        }
        else if (active == 3 && (userInputData?.difficulty == undefined || userInputData?.duration == undefined || userInputData?.videoOption == undefined || userInputData?.Chapter == undefined)) {
            return true;
        }

        return false;
    }

    // console.log(userInputData);
    

    const UpdateDb = async (courseLayout) => {

        let id = uuidv1();        
        const result = await db.insert(CourseList).values({
            courseId:id,
            name:courseLayout?.course_name ,
            category:courseLayout?.category,
            level:courseLayout?.level,
            description:courseLayout?.description,
            courseOutput:courseLayout?.chapters,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName,
            userProfileImage:user?.imageUrl,
            videoIncluded:userInputData?.videoOption,
            duration:userInputData?.duration

        })
        router.replace(`/create-course/${id}`)      
    }

    // console.log(courseLayout);


    const GenerateCourseLayout = async () => {
        setLoading(true);
        const generalPrompt = "Generate A Course Tutorial on Following Details with field as course_name , description , Along with chapter_name , about, duration , category : don't change the field name";
        const userPromt = `Category : ${userInputData?.category}, Topic : ${userInputData?.course} , Level : ${userInputData?.difficulty} , Duration:${userInputData?.duration} , No of Chapter : ${userInputData?.Chapter} it is important to include ${userInputData?.description} topic/related to this  , in json format .`;
        const final_promt = generalPrompt + userPromt;
        // console.log(final_promt);`

        // const result = await GenerateCourseLayoutAI.sendMessage(final_promt);
        // console.log(result.response?.text());
        // console.log(JSON.parse(result.response?.text()));

        // setCourseLayout(JSON.parse(result.response?.text()));    
        
        // await UpdateDb(JSON.parse(result.response?.text()));   
        // setLoading(false); 

        try {
            const response = await axios.post('/api/groqChat',{
              title:final_promt
            });
            const CourseData =  JSON.parse(response.data);
            console.log(CourseData);
            setCourseLayout(CourseData);
            await UpdateDb(CourseData);  
          } catch (error) {
            console.error("Error fetching Groq API:", error);
          }

          setLoading(false);
    }

    useEffect(() => {

        // console.log(userInputData);


    }, [userInputData])


    return (
        <div className=''>
            <h1 className='text-4xl text-primary font-semibold text-center'>Create Course</h1>
            <div className='flex justify-center'>
                <div className='flex mt-16'>
                    {level.map((ele) => {
                        return (
                            <div className='flex clear-start items-center text-slate-400' key={ele.indx} >
                                <div className={`flex flex-col  justify-center items-center ${active >= ele.indx && "text-primary"}`}>
                                    <div className='text-3xl '>
                                        {ele.icon}
                                    </div>
                                    <h1>{ele.title}</h1>
                                </div>
                                {ele.indx != 3 && <div className={`w-[80px] md:w-[130px] h-[4px] relative -top-2  ${active >= ele.indx + 1 ? "bg-primary" : "bg-slate-300"}`}></div>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='p-4 my-4'>
                {active == 1 && <Selector />}
                {active == 2 && <Description />}
                {active == 3 && <SelectOpt />}

            </div>
            <div className='flex gap-6 justify-center py-6 mt-6'>
                <Button disabled={active == 1} onClick={handlePrev}>Prev</Button>

                {active < 3 ? <Button disabled={checkStatus()} onClick={handleNext}>Next</Button> : <Button onClick={GenerateCourseLayout}>Generate course</Button>}

            </div>
            <div>
                {loading && <Loading loading={loading}/>}
            </div>
        </div>
    )
}

export default page
