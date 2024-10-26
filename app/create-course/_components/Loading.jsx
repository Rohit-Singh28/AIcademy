import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

function Loading({loading}) {
  return (
<AlertDialog open={loading}>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogDescription asChild>
        <div className={"flex flex-col items-center  py-6"}>
            <Image src="/read.gif" alt="loading" width={100} height={100} />
            <h1>Please wait... AI is working to Generate Your Course</h1>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default Loading
