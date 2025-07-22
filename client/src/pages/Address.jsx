import { useState } from 'react'
import {useSelector} from 'react-redux'
import { AddAddress } from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { EditAddressDetails } from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

export const Address = () => {
    const addressList = useSelector(state => state.addresses.addressList) 
    const [isAddAddress,setIsAddAddress] = useState(false)
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({})
    const {fetchAddress} = useGlobalContext()
    const handleDisableAddress = async(_id) =>{
        try {
            const response = await Axios({
                ...SummaryApi.disableAddress,
                data : {
                    _id : _id
                }
            })
            const {data : responseData} = response
            if(responseData.success){
                toast.success("Address Removed")
                if (fetchAddress) {
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <div>
        <div className='bg-white shadow-lg px-2 py-2 flex justify-between items-center'>
            <h2 className='font-semibold'>Address</h2>
            <button onClick={()=>setIsAddAddress(true)} className='border border-primary-200 text-primary-200 rounded-full hover:bg-primary-100 hover:text-black px-3'>
                    Add address
                </button>
        </div>
        <div className='w-full mt-2'>
        {/*Address*/}
        <div className='bg-white p-2 grid gap-4'>
                {
                    addressList.map((address, index) => {
                        console.log(address.status);
                        
                        return (
                            <div key={index+"address"} className={`border rounded p-3 flex gap-3 bg-white ${!address.status && "hidden"}`}>
                            <div className='mr-auto'>
                                <p>{address.address_line}</p>
                                <p>{address.city}</p>
                                <p>{address.state}</p>
                                <p>{address.country} - {address.pincode}</p>
                                <p>{address.mobile}</p>
                            </div>
                             <div className=' grid gap-10'>
                                <button onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(address)
                                    }} className='bg-green-200 p-1 rounded  hover:text-white hover:bg-green-600'>
                                    <MdEdit/>
                                </button>
                                <button onClick={()=>
                                    handleDisableAddress(address._id)
                                    } className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                                    <MdDelete size={20}/>  
                                </button>
                            </div>
                            </div>
                        )
                    })
                }
        </div>
        </div>
        {
            isAddAddress && (
                <AddAddress close={()=>setIsAddAddress(false)}/>
            )
        }
        {
            openEdit && (
                <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
            )
        }
    </div>
  )
}
