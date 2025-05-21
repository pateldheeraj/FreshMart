import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

export const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowPass,setIsShowPass] = useState(false) 
    const [isConfirmShowPass,setIsConfirmShowPass] = useState(false) 
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })
    useEffect(()=>{
        // if(!location?.state?.data?.success){
        // navigate("/")
        // }
        if(location?.state?.email){
            setData((prev)=>{
                return{
                    ...prev,
                    email : location?.state?.email
                }
            })
        }
    },[])
    const valideValue = Object.values(data).every(el => el)
    const handleChange = (e) => {
        const {name,value} = e.target
     
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
        
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error("New Password and Confirm Password Must be Same")
        }

        try {
            const response = await Axios({
                ...SummaryApi.reset_password,
                data : data
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                    navigate('/login')
                setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
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
            <p className='font-semibold  text-lg'>Enter Your Password</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className=' grid gap-1'>
                    <label htmlFor="name">New Password :</label>
                    <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200 outline-none'>
                        <input 
                            type={!isShowPass ? "password" : "text"}
                            id='password'
                            name='newPassword'
                            value={data.newPassword}
                            onChange={handleChange}
                            className=' w-full outline-none'
                            placeholder='Enter your new password'
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
                </div>
                <div className=' grid gap-1'>
                    <label htmlFor="name">Confirm Password :</label>
                    <div className='flex items-center bg-blue-50 p-2 border rounded focus-within:border-primary-200 outline-none'>
                        <input 
                            type={!isConfirmShowPass ? "password" : "text"}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleChange}
                            className=' w-full outline-none'
                            placeholder='Enter your confirm password'
                        />
                        <div className=''>
                            {   isConfirmShowPass ? 
                                    <FaEye
                                        className=' cursor-pointer '
                                        onClick={()=>setIsConfirmShowPass(!isConfirmShowPass)}
                                        size={18}
                                    /> 
                                    : 
                                    <FaEyeSlash 
                                        className=' cursor-pointer'
                                        onClick={()=>setIsConfirmShowPass(!isConfirmShowPass)}
                                        size={18}
                                    />
                            }
                        </div>
                    </div>
                </div>
                
                <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } rounded my-3 py-2 text-white font-semibold tracking-wide`}>
                    Change Password
                </button>
            </form>
            <p>
                Already have an account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}
