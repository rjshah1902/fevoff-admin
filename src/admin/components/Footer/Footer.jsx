import React from 'react'
import "./footer.css";

const Footer = () => {
    return (
        <>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p className='font-bold italic'>Copyright © {new Date().getFullYear()} - All right reserved by Fevoff PVT. LTD.</p>
                </aside>
            </footer>
        </>
    )
}

export default Footer
