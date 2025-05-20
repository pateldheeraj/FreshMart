import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router";
import toast from 'react-hot-toast';

export const Register = () => {

    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [isShowPass,setIsShowPass] = useState(false) 
    const [isConfirmShowPass,setIsConfirmShowPass] = useState(false) 
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

        if(data.password !== data.confirmPassword){
            toast.error(
                 "password and confirm password must be same"
            )
            return
        }
        
    }
  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
            <p>Welcome to FreshMart</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className=' grid gap-1'>
                    <label htmlFor="name">Name :</label>
                    <input 
                        type="text"
                        id='name'
                        autoFocus
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                    />
                </div>
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
                    Register
                </button>
            </form>
            <p>
                Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}
