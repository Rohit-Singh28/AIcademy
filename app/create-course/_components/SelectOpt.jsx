import { UserInpContext } from '@/app/_context/UserInpContext';
import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'

const SelectOpt = () => {

    const { userInputData, setUserInputData } = useContext(UserInpContext);

    const handleOnchange = (key, value) => {
        setUserInputData((prev) => {
            return ({
                ...prev,
                [key]: value,
            })
        })

    }


    return (
        <div className='w-full md:w-[60%] mx-auto grid grid-cols-2 gap-10'>
            <div className='w-full'>
                <label htmlFor="difficulty">Selct Difficulty Level</label>
                <select name="difficulty" id="difficulty" className='border w-full py-1 px-4' defaultValue={userInputData?.difficulty}
                    onChange={(e) => handleOnchange("difficulty", e.target.value)}>
                    <option>select opt</option>
                    <option value={"easy"}>Easy</option>
                    <option value={"indermidate"}>Intermidate</option>
                    <option value={"hard"}>Hard</option>

                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="duration">Select Course Duration</label>
                <select name="duration" id="duration" className='border w-full py-1 px-4' defaultValue={userInputData?.duration}
                    onChange={(e) => handleOnchange("duration", e.target.value)}>

                    <option>select opt</option>
                    <option value={"3hrs"}>3hrs</option>
                    <option value={"5hrs"}>5hrs</option>
                    <option value={"7hrs"}>7hrs</option>

                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="videoOpt">Add Video</label>
                <select name="videoOpt" id="videoOpt" className='border w-full py-1 px-4' defaultValue={userInputData?.videoOption}
                    onChange={(e) => handleOnchange("videoOption", e.target.value)}>

                    <option>select opt</option>
                    <option value={"YES"}>YES</option>
                    <option value={"NO"}>NO</option>
                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="Chapter">No of Chapter</label>
                <Input type="number" defaultValue={userInputData?.Chapter}
                    onChange={(e) => handleOnchange("Chapter", e.target.value)} />
            </div>
        </div>
    )
}

export default SelectOpt
