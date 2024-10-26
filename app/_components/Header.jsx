import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between px-10 shadow-md items-center h-[100px] z-50 '>
      <div className=''><img src={'/AC.png'} alt='logo' className=' h-24 mix-blend-multiply overflow-hidden ' /></div>
   
    </div>
  )
}

export default Header
