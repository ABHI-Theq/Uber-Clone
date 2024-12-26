import React from 'react'

function CaptainDetails({captain}) {
  // console.log(captain);
  
  return (
    <div>
         
         <div className='flex item-center justify-between mb-8'>
          <div className='flex items-center justify-between gap-3'>
            <img className="w-14 h-14 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
            <h4 className='text-xl font-medium capitalize'>{captain.fullName.firstName+' '+captain.fullName.lastName}</h4>
          </div>
          <div>
            <h4 className='text-2xl font-medium '>₹295.20</h4>
            <p className='text-xs text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex p-5 rounded-lg  bg-yellow-500   items-center justify-between'>
          <div className='text-center'>
          <i className="text-3xl font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
          <i className="text-3xl font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
      
    </div>
  )
}

export default CaptainDetails