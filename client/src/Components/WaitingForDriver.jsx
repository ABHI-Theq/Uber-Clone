import React from 'react'

function WaitingForDriver({swfd,ride}) {
  return (
    <div>
              <h5 className='p-1 text-center w-[93%] absolute top-0'><i
        onClick={()=>{
            swfd(false)
        }}
        className="  active:bg-gray-200 rounded-xl block w-full text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
     <div className="my-10 px-5  flex items-center justify-between">
     <img className='h-16 ml-[-20px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
      <div className='text-end'>
        <h2 className='text-lg font-semibold'>{ride?.captain.fullName.firstName+' '+ride?.captain.fullName.lastName}</h2>
        <h2 className='text-xl font-bold'>{ride?.captain.vehicle.plate}</h2>
        <p className='text-gray-600 text-sm font-normal'>White Suzuki S-Presso LXI</p>
        <h1 className='text-lg font-semibold'>{ride?.otp}</h1>
      </div>
      </div> 
      <div className='w-full'>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll text-nowrap scrollbar-thin  h-15'>{ride?.pickup}</p>
                    
                </div>
                
            </div>
            <hr className='w-[77%]  border-1 absolute right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll text-nowrap scrollbar-thin  h-15'>{ride?.destination}</p>
                </div>
            </div>
            <hr className='w-[77%] absolute border-1 right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-bank-card-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]'>
                    <h3 className='text-xl font-bold'>₹{ride?.fare}</h3>
                    <p className='text-base text-gray-600  font-normal'>Cash Cash</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WaitingForDriver