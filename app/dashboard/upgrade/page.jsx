import React from 'react'
import PurchaseCard from './_components/PurchaseCard'

const Upgrade = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
      <PurchaseCard title={"FREE"} NoCourse={"5"} Feature={"_"} People={"5000"} Price={"0"}/>
      <PurchaseCard title={"PLUS"} NoCourse={"8"} Feature={"WhatsApp doubt solving"} People={"2000"} Price={"399"}/>
      <PurchaseCard title={"PREMINUM"} NoCourse={"12"} Feature={"One To ONE doubt solving"} People={"1000"} Price={"699"}/>
    </div>
  )
}

export default Upgrade
