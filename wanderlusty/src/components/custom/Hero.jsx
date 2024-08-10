import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1
                className='font-extrabold text-[50px] text-center mt-16'
            >
                <span className='text-[#f56551]'>
                    Smart Trips for Savvy Travelers:
                </span>
                Let AI smooth out the bumps on your next journey.
                <p className='text-xl text-gray-500 text-center'>
                    Your personal trip planner and travel curator, creating custom itenaries tailored to your interests and budget.
                </p>
                <Link to={"/create-trip"}>
                    <Button>Get Started, It's Free</Button>
                </Link>
            </h1>
        </div>
    )
}

export default Hero
