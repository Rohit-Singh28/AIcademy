import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="">
            <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:h-[calc(100vh-80px)] lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-6xl mb-6 md:mb-0  font-extrabold sm:text-5xl text-primary">
                        AI Course Generator
                    </h1>
                    <strong className="text-4xl text-black text-bold  sm:text-5xl sm:block my-8 md:my-3">Custom Learning Path Powered By AI</strong>

                    <p className='my-8 text-xl md:text-[1rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint adipisci dignissimos blanditiis labore quod,.</p>

                    <Link href="/dashboard" className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-800 focus:outline-none focus:ring sm:w-auto"
                            
                        >
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
