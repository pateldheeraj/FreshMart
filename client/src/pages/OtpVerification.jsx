import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';


export const OtpVerification = () => {
    const navigate = useNavigate()
    const [data,setData] = useState(["","","","","",""])
    const inputRef = useRef([])
    const location = useLocation()
    const valideValue = data.every(el => el)
   
    useEffect(()=>{
      if(!location?.state?.email){
        navigate("/forgot-password")
      }
    },[])
  
    const handleSubmit = async(e) => {
        e.preventDefault()
 
        try {
            const response = await Axios({
                ...SummaryApi.verify_forgot_password_otp,
                data : {
                  otp : data.join(""),
                  email : location?.state?.email
                }
            })
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/reset-password',{
                  state : {
                    data : response.data,
                    email:location?.state?.email
                  }
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
            <p className='font-semibold  text-lg'>Enter OTP</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className=' grid gap-1'>
                    <label htmlFor="name">Enter OTP :</label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                      {data.map((value,index)=>(
                      <input 
                        key={"otp"+index}
                        type='text'
                        id='otp'
                        value={data[index]}
                        ref={(ref)=>{
                          inputRef.current[index] = ref
                          return ref
                        }}
                        onChange={
                          (e)=>{
                            const newData = [...data]
                            newData[index] = e.target.value
                            setData(newData)

                            if(e.target.value && index <5){
                              inputRef.current[index+1].focus()
                            }
                          }
                        }

                        maxLength={1}
                        className='bg-blue-50 w-full p-2 border rounded outline-none focus:border-primary-200 max-w-16 mt-2 mx-auto text-center font-semibold'
                    />
                    ))}
                    </div>
                </div>
                <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } rounded my-3 py-2 text-white font-semibold tracking-wide`}>
                    Submit OTP
                </button>
            </form>
            <p>
                Already have an account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}