import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';



const DropDown = ({ courseId, setDel }) => {

    const handleDelete = async (e) => {
        e.stopPropagation()
        
        let res = window.confirm("Are you Sure you want to delete this course?");
        if (res) {
            try {
                const response = await db.delete(CourseList).where(eq(CourseList.courseId, courseId))
                setDel();
                console.log(response);

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical size={16} /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Course</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete}>Delete <Trash2 size={15} className='ml-5' /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropDown
