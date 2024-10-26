"use client"
import React from 'react'
import StudentProgressBarChart from './_components/Bar'
import ThreeDPieChart from './_components/Pie'


const Progress = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl  text-slate-800 text-center font-semibold'>Student Progress Report</h1>
      <div>
        <StudentProgressBarChart />
      </div>
      <div className='w-full h-[1px] bg-slate-500'></div>
      <div>
        <ThreeDPieChart />
      </div>
    </div>
  )
}

export default Progress