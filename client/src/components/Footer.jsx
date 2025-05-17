import React from 'react'
import { FaFacebook, FaInstagram, FaLine, FaLinkedin } from "react-icons/fa";


export const Footer = () => {
  return (
   <footer className='border-t'>
            <div className='container flex flex-col gap-4 p-4 mx-auto text-center lg:flex-row lg:justify-between '>
                <p> © All rights are reserved 2025</p>

                <div className='flex items-center justify-center gap-4 text-2xl'>
                <a href="" className='hover:text-primary-100'>
                    <FaFacebook/>
                </a>
                <a href="">
                    <FaInstagram/>
                </a>
                <a href="">
                    <FaLinkedin/>
                </a>
            </div>

            </div>

   </footer>
  )
}
