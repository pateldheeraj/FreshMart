import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';


export const ForgotPassword = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
    });

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
                ...SummaryApi.forgot_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/verification-otp',{
                    state:data
                })
                setData({
                    email:"",
                })
                
            }
            console.log(response);
        } catch (error) {
            AxiosToastError(error)
        }
        
    }
  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
            <p className='font-semibold  text-lg'>Forgot Password</p>

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
                <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } rounded my-3 py-2 text-white font-semibold tracking-wide`}>
                    Send Otp
                </button>
            </form>
            <p>
                Already have an account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}