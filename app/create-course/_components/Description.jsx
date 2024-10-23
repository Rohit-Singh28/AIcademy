import { UserInpContext } from '@/app/_context/UserInpContext';
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"


import React, { useContext } from 'react'

const Description = () => {

    const { userInputData, setUserInputData } = useContext(UserInpContext);
    const handleOnChange = (key,value) => {
        setUserInputData((prev) => {
            return({
                ...prev,
                [key]:value,
            })
        })
        
    }

    return (
        <div className='w-full md:w-[50%] mx-auto space-y-6 my-5 py-4'>
            <div>
                <Label htmlFor="topic" className="text-slate-700 text-md">Write the topic for which you want to create course(eg. Python Course,Yoga ,etc)</Label>
                <input type="text" id='course' name='course' className='w-full border h-8 p-2 ' placeholder='course' defaultValue={userInputData?.course}
                onChange={(e) => handleOnChange("course",e.target.value)}/>
            </div>
            <div>
                <Label htmlFor="" className="text-slate-700 text-md">Tell us more about what you want to add more in your course</Label>
                <input type="text" id='desc' name='desc' className='w-full border h-8 p-2 ' placeholder='more details' defaultValue={userInputData?.description}
                onChange={(e) => handleOnChange("description",e.target.value)}/>

            </div>
        </div>
    )
}

export default Description
