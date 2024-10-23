import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const HeaderD = () => {

  const [menu,setMenu] = useState(false);

  return (
    <div className='w-full h-[80px] shadow-sm py-4 gap-4 px-6 flex justify-between'>
      <Image src={"/images.jpeg"} width={80} height={100} alt='logo'/>
      <div className='ml-auto md:ml-0'>
      <UserButton />
      </div>
      <div onClick={() => {setMenu(true)} } className='md:hidden cursor-pointer'><Menu/></div>

      {
        menu &&  (
          <div className='fixed top-0 right-0 h-screen w-[80vw] bg-slate-100'>
            <div className='flex flex-col gap-4 p-4'>
              <div onClick={() => {setMenu(false)}} className='text-right cursor-pointer ml-auto'><X/></div>
              <Sidebar setMenuBar={() => setMenu(false)}/>
            </div>
          </div>
        )

      }
    </div>
  )
}

export default HeaderD
