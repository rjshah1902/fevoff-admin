import React from 'react'

const SuccessMessage = ({ message }) => {
    return (
        <>
            <div role="alert" className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex justify-between">
                <span>{message}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </>
    )
}

export default SuccessMessage
