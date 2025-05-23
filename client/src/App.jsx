import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import {setUserDetails} from"./store/userSlice"
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()
  const fetchUser = async () => {
    const userdata = await fetchUserDetails()
    dispatch(setUserDetails(userdata?.data))
    
  }

  useEffect(()=>{
     fetchUser()
  },[])

  return (
    <>
        <Header/>
          <main className='min-h-[78vh]'>
                <Outlet/>
          </main>
        <Footer/>
        <Toaster/>
    </>
    
  )
}

export default App
