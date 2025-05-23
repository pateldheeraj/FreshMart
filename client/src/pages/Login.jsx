import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { setUserDetails } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import fetchUserDetails from '../utils/fetchUserDetails';


export const Login = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        password:"",
    });
    const dispatch = useDispatch()
    const [isShowPass,setIsShowPass] = useState(false) 
    const handleChange = (e) => {
        const {name,value} = e.target
     
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()
 
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))
                setData({
                    email:"",
                    password:"",
                })
                localStorage.setItem("accessToken",response.data.data.accessToken)
                localStorage.setItem("refreshToken",response.data.data.refreshToken)
                navigate('/')
            }
            console.log(response);
        } catch (error) {
            AxiosToastError(error)
        }
        
    }
  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
            {/* <p>Welcome to FreshMart</p> */}

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className=' grid gap-1'>
                    <label htmlFor="name">Email :</label>
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                    />
                </div>
                <div className=' grid gap-1'>
                    <label htmlFor="name">Password :</label>
                    <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200 outline-none'>
                        <input 
                            type={!isShowPass ? "password" : "text"}
                            id='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            className=' w-full outline-none'
                        />
                        <div className=''>
                            {   isShowPass ? 
                                    <FaEye
                                        className=' cursor-pointer '
                                        onClick={()=>setIsShowPass(!isShowPass)}
                                        size={18}
                                    /> 
                                    : 
                                    <FaEyeSlash 
                                        className=' cursor-pointer'
                                        onClick={()=>setIsShowPass(!isShowPass)}
                                        size={18}
                                    />
                            }
                        </div>
                    </div>
                    <Link to={"/forgot-password"} className='ml-auto block hover:text-primary-200'>forgot password?</Link>
                </div>
                <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } rounded my-3 py-2 text-white font-semibold tracking-wide`}>
                    Login
                </button>
            </form>
            <p>
                Don't have an account ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
            </p>
        </div>
    </section>
  )
}