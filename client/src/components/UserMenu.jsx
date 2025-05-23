import { useDispatch, useSelector } from "react-redux"
import { Divider } from "./Divider"
import { Link, useNavigate } from "react-router-dom"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import { logout } from "../store/userSlice"
import toast from "react-hot-toast"
import AxiosToastError from '../utils/AxiosToastError'
import { FaExternalLinkAlt } from "react-icons/fa";

export const UserMenu = ({close}) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleLogout = async()=> {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })

            if(response.data.success){
                if(close){
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigator('/')
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    
  return (
   <div>
     <div className="font-semibold ">
        My Account
    </div>
    <div className="text-sm flex gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">{user.name || user.mobile}</span> 
        <Link to={"/dashboard/profile"}>
        <FaExternalLinkAlt size={15} className="hover:text-primary-200"/>
        </Link>
    </div>
    <Divider/>
    <div className="text-sm grid gap-2">
        <Link to="" className=" px-2 hover:bg-orange-200">My Orders</Link>
        <Link to="" className=" px-2 hover:bg-orange-200">Save Address</Link>
        <button onClick={handleLogout} className="text-left  px-2 hover:bg-orange-200">Log Out</button>
    </div>
   </div>
  )
}
