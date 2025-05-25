import React from 'react'
import { UserMenu } from '../components/UserMenu'
import { Profile } from '../pages/Profile'
import { Outlet } from 'react-router-dom'
import { Divider } from '../components/Divider'

export const Dashboard = () => {
  return (
    <section className='bg-white '>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
            {/* left for menu */}

            <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block border-r'><UserMenu/></div>

            {/* right for content */}

            <div className='bg-white p-4'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}
