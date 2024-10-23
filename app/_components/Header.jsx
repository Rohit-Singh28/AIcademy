import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between px-10 shadow-md items-center h-[100px] '>
      <img src={'/images.jpeg'} alt='logo' className=' h-20 mix-blend-multiply overflow-hidden '/>
      <Button>Get Started</Button>
    </div>
  )
}

export default Header
