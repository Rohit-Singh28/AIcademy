"use client"
import Link from 'next/link'
import React from 'react'

import Spline from '@splinetool/react-spline/next';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const Hero = () => {

    const router = useRouter();

    return (
        <section className="flex md:flex-row text-center">

            <div className='md:relative top-40 left-16'>
                <h1 className='text-5xl md:text-9xl font-semibold mb-6 font-primaryfont'>AIcademy</h1>
                <p className='text-3xl md:text-5xl ml-6 font-secondaryfont'>The future of E-Learning</p>

               <Link href={'/dashboard'}>
               <Button className=' cursor-pointer my-12 text-xl w-[200px] py-4 ml-6' >Get Started</Button>
               </Link>
            </div>
            <main className='hidden md:flex z-0 relative top-10 left-16'> 
                <Spline
                    scene="https://prod.spline.design/F5N3f2HeMm3EqKPB/scene.splinecode"
                />
            </main>

        </section>
    )
}

export default Hero
