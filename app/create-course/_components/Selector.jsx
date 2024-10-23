"use client"
import { UserInpContext } from '@/app/_context/UserInpContext'
import category from '@/app/_resources'
import Image from 'next/image'
import React, { useContext } from 'react'
import Loading from './Loading'

const Selector = () => {

    const { userInputData, setUserInputData } = useContext(UserInpContext);
    
    const handleSelectChoice = (category) => {
        setUserInputData((prev) => {
            return({
                ...prev,
                category:category,
            })
        })
        
    }

    // console.log(userInputData);
    

    return (
        <div>
            <h1 className='text-2xl text-slate-600 my-8 text-center'>Select Category</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between items-center w-[70%] mx-auto'>
                {category.map((ele) => {
                    return (
                        <div key={ele.indx}
                            className={`flex flex-col justify-center items-center gap-4 shadow-sm border p-4 rounded-xl ${userInputData?.category==ele.title &&  "border-primary bg-blue-100"} `}
                            onClick={() => handleSelectChoice(ele.title)}
                        >
                            <Image src={ele.img} alt='coding' width={200} height={300} />
                            <h1 className='text-center text-xl'>{ele.title}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Selector
