"use client";
import React, { useContext, useState ,useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaPenToSquare } from "react-icons/fa6";
import { CourseDataContext } from '@/app/_context/CourseData';
import { Label } from '@radix-ui/react-dropdown-menu';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


function EditCourseInfo() {

    const { courseInfo, setCourseInfo } = useContext(CourseDataContext);
    const [newTitle, setNewTitle] = useState(courseInfo?.name);
    const [newDescription, setNewDescription] = useState(courseInfo?.description);

    // console.log(newDescription);
    // console.log(courseInfo);
    
    

    const handleUpdate = async() => {
        setCourseInfo({ ...courseInfo, name: newTitle ?? courseInfo.name, description: newDescription ?? courseInfo.description });
        const result = await db.update(CourseList).set({ name: newTitle, description: newDescription })
        .where(eq(CourseList.id, courseInfo.id))
        .returning({id:CourseList.id});
        console.log(result);
        
    }    


    // console.log(courseInfo);
    

    return (
        <Dialog>
            <DialogTrigger>
                <FaPenToSquare />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-10">Edit Course Information </DialogTitle>
                    {/* <DialogDescription> */}

                    <div className="space-y-3">
                        <Label htmlFor="Course_Title" className="text-slate-700 text-md font-semibold ">Course Title</Label>
                        <input type="text" id='Course_Title' name='Course_Title'
                            onChange={(e) => setNewTitle(e.target.value)}
                            className='w-full border h-8 p-2 ' defaultValue={courseInfo?.name} />


                        <Label htmlFor="description" className="text-slate-700 text-md font-semibold ">Course Description</Label>
                        <textarea name="description" rows="10" id="description"
                            onChange={(e) => setNewDescription(e.target.value)}
                            className='w-full border  p-2 ' defaultValue={courseInfo?.description}></textarea>
                    </div>
                    {/* </DialogDescription> */}
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleUpdate}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        

    )
}

export default EditCourseInfo
