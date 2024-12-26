import React from 'react'

function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) {
  
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
        setPickup(suggestion)
    } else if (activeField === 'destination') {
        setDestination(suggestion)
    }
}
// console.log(suggestions);


return (
    <div className='overflow-y-auto'>
        {/* Display fetched suggestions */}
        {!suggestions?'':
            suggestions.map((elem, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(elem.description)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <div className='w-[80%] font-medium text-sm h-10 overflow-x-auto resize-x'>{elem.description}</div>
                </div>
            ))
        }
    </div>
)
}

export default LocationSearchPanel