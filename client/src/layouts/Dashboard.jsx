import { UserMenu } from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
            {/* left for menu */}

            <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block border-r '><UserMenu/></div>

            {/* right for content */}

            <div className='bg-white p-4 h-full min-h-[78vh] '>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}
