import React from 'react'

function AutoCompleteAddress() {
    return (
        <div className='mt-5'>
            <div>
                <label >Where From?</label>
                <input 
                type="text" 
                    className='bg-white p-1 border-[2px] w-full rounded-md outline-none'
                />
            </div>
        </div>
    )
}

export default AutoCompleteAddress