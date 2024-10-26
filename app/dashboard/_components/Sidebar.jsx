"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { BsShieldCheck } from "react-icons/bs";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
    import { Progress } from "@/components/ui/progress"
import { CurrentUserCourse } from '@/app/_context/CurrentUserCourse';


const Sidebar = ({setMenuBar}) => {

    const {currentCourse} = useContext(CurrentUserCourse);
    // console.log(currentCourse);

    const path = usePathname();
    const option = [
        {
            id: 1,
            title: "Home",
            icon: <AiOutlineHome />,
            link: "/dashboard"
        },
        {
            id: 2,
            title: "Progress",
            icon: <HiOutlineSquare3Stack3D />,
            link: "/dashboard/progress"
        },
        {
            id: 3,
            title: "Upgrade",
            icon: <BsShieldCheck />,
            link: "/dashboard/upgrade"
        },
    ]
    return (
        <div className='w-full md:w-[250px] py-5 px-5 space-y-10 border-r-2'>
            <div className='flex justify-center items-center'>
                <Image src={'/AC.jpg'} width={200} height={200} alt='logo'/>
            </div>
            <ul className='flex gap-2 flex-col'>
                {option.map((ele) => {
                    return (
                        <Link href={ele.link} key={ele.id}> 
                            <div  onClick={setMenuBar}
                            className={`flex items-center gap-6 text-slate-600 rounded-md hover:text-black hover:bg-slate-300 p-2 ${ele.link == path && "bg-slate-300 text-black"}`}>
                            <div className='text-lg'>{ele.icon}</div>
                            <h1 className='text-xl'>{ele.title}</h1>
                            </div>
                        </Link>
                    )
                })}
            </ul>

            <div className='relative top-20 md:top-48 w-[90%] space-y-2'>
                <div><Progress value={(currentCourse?.length /5)*100 } /></div>
                <h1 className=''>{currentCourse?.length} out of 5 course created</h1>
                <p className='text-slate-500'>upgrade to premium version</p>
            </div>
        </div>
    )
}

export default Sidebar
