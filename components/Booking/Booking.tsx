"use client"
import React, { useEffect, useState } from 'react';
import AutoCompleteAddress from './AutoCompleteAddress'

function Booking() {
    const [screenHeight, setScreenHeight] = useState<number | null>(null);

    useEffect(() => {
        // Set the screen height when the component mounts on the client side
        setScreenHeight(window.innerHeight * 0.72);

        // Optional: Update height on window resize
        const handleResize = () => setScreenHeight(window.innerHeight * 0.72);
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (screenHeight === null) return null;

    return (
        <div className='p-5'>
            <h2 className='text-[20px] font-semibold'>Booking</h2>
            <div
                className='border-[1px] p-5 rounded-md'
                style={{height:screenHeight}}>
            <AutoCompleteAddress />
        </div>
        </div >
    )
}

export default Booking