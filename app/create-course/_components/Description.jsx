import { UserInpContext } from '@/app/_context/UserInpContext';
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

import React, { useContext } from 'react'

const Description = () => {

    const placeholders = [
        "What is DSA?",
        "What are the principles of user experience (UX) design?",
        "What are the fundamental principles of personal finance, and how can they be applied to create a sustainable budget?",
        "Write a Javascript method to reverse a string",
        "How can mindfulness and meditation practices enhance the overall effectiveness of a yoga practice?",
    ];
    const placeholders1 = [
        "Describe more about your topic..."
    ];

    const { userInputData, setUserInputData } = useContext(UserInpContext);
    const handleOnChange = (key, value) => {
        setUserInputData((prev) => {
            return ({
                ...prev,
                [key]: value,
            })
        })

    }

    return (
        <div className='w-full md:w-[50%] mx-auto space-y-6 my-5 py-4 text-center'>
            <div>
                <Label htmlFor="topic" className="text-slate-700 text-md">Write the topic for which you want to create course(eg. Python Course,Yoga ,etc)</Label>
                {/* <input type="text" id='course' name='course' className='w-full border h-8 p-2 ' placeholder='course' defaultValue={userInputData?.course}
                    onChange={(e) => handleOnChange("course", e.target.value)} /> */}
                <PlaceholdersAndVanishInput className='w-full border h-8 p-2 duration-600' defaultValue={userInputData?.description}
                    placeholders={placeholders}
                    onChange={(e) => handleOnChange("course", e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="" className="text-slate-700 text-md">Tell us more about what you want to add more in your course</Label>
                {/* <input type="text" id='desc' name='desc' className='w-full border h-8 p-2 ' placeholder='more details' defaultValue={userInputData?.description}
                    onChange={(e) => handleOnChange("description", e.target.value)} /> */}
                <PlaceholdersAndVanishInput className=" className='w-full border h-8 p-2 ' placeholder='more details' defaultValue={userInputData?.description}"
                    placeholders={placeholders1}
                    onChange={(e) => handleOnChange("description", e.target.value)}
                />

            </div>
        </div>
    )
}

export default Description
