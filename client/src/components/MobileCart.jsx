import { FaCaretRight, FaCartShopping } from "react-icons/fa6";
import { useGlobalContext } from "../provider/GlobalProvider";
import { Link } from "react-router-dom";
import { priceConverter } from "../utils/priceConverterInRupees";
import { useSelector } from "react-redux";

export const MobileCart = () => {
    const {totalPrice,totalQty} = useGlobalContext()
    const cartItem = useSelector(state=>state?.cartItem?.cart)

  return (
    <>
        {
            cartItem[0] && (
                    <div className='p-2 sticky bottom-4'>
                        <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
                        <div className="flex items-center gap-2">
                                <div className='p-2 bg-green-500 rounded w-fit'>
                                    < FaCartShopping />
                                </div>
                                <div className='text-xs'>
                                    <p>{totalQty} Items</p>
                                    <p>{priceConverter(totalPrice)}</p>
                                </div>
                        </div>
                            <Link to={"/cart"} className='flex items-center gap-1'>
                                    <span className='text-sm'>View Cart</span>
                                    <FaCaretRight/>
                            </Link>
                        </div>
                    </div>
            )
        }
    </>

  )
}
