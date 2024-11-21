import React, { useEffect, useState } from 'react';

function AutoCompleteAddress() {
    const [source, setSource] = useState<any>();
    const [addressList, setAddressList] = useState<any>([]);

    useEffect(() => {
        console.log('source changed:', source); // Log whenever source changes
        const delayDebounceFn = setTimeout(() => {
            getAddressList();
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [source]);

    const getAddressList = async () => {
        if (!source) {
            console.log('No source entered. Skipping API call.');
            setAddressList([]); // Clear address list if source is empty
            return;
        }

        console.log('Fetching address list for source:', source);
        try {
            const res = await fetch('/api/search-address?q=' + source, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                console.error('Error fetching address list:', res.status, res.statusText);
                return;
            }

            const result = await res.json();
            console.log('Fetched address list:', result);
            setAddressList(result);
        } catch (error) {
            console.error('Error in getAddressList:', error);
        }
    };

    return (
        <div className='mt-5'>
            <div>
                <label className='text-gray-400'>Where From?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[2px] w-full rounded-md outline-none focus:border-yellow-300'
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                {addressList?.suggestions ? (
                    <div>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2
                                key={index}
                                className='p-3 hover:bg-gray-100 cursor-pointer'
                            >
                                {item.full_address}
                            </h2>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className='mt-3'>
                <label className='text-gray-400'>Where To?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[2px] w-full rounded-md outline-none focus:border-yellow-300'
                />
            </div>
        </div>
    );
}

export default AutoCompleteAddress;
