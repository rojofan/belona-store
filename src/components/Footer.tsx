import React from 'react'
import {AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiOutlineWhatsApp} from "react-icons/ai";

const Footer = () => {
    return (
        <div className="footer-container">
            <p>© 2023 Belona Store. All rights reserved</p>
            <h1 className="icon">
                <AiFillInstagram/>
                <AiFillFacebook/>
                <AiOutlineTwitter/>
                <AiOutlineWhatsApp/>
            </h1>
        </div>
    )
}

export default Footer