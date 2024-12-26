import React from 'react'

function RidePopUp({srpp,scrpp,ride,confirmRide}) {
    // if(!ride) return null
  return(
                <div>
                <h5 className='text-center'
                onClick={()=>{
                    srpp(false);
                }}
                ><i
                className="  active:bg-gray-200 rounded-xl block w-full text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
                <h3 className='text-xl font-bold '>New Ride Available!</h3>
                <div className='my-2 p-2 flex items-center justify-between  w-full bg-yellow-400 rounded-lg'>
                    <div className=' flex items-center gap-2'>
                        <img className="w-12 h-12 rounded-full object-cover" src="https://www.shutterstock.com/image-photo/handsome-indonesian-southeast-asian-man-260nw-2476654675.jpg" alt="" />
                        <h3 className='text-lg font-medium'>{ride?.userId.fullName.firstName+' '+ride?.userId.fullName.lastName}</h3>
                    </div>
                    <h5>2.2Km</h5>
                </div>
        
                <div className="flex flex-col gap-2 justify-between items-center ">
                <div className='w-full'>
                    <div className='flex items-center gap-2 justify-start py-3'>
                        <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                        <div className='w-[80%]'>
                            <h3 className='text-xl font-bold'>562/11-A</h3>
                            <p className='text-base text-gray-600 overflow-x-scroll scrollbar-thin text-nowrap h-15 font-normal'>{ride?.pickup}</p>
                            
                        </div>
                        
                    </div>
                    <hr className='w-[80%]  border-1 absolute right-4'/>
                    <div className='flex items-center gap-2 justify-start py-3'>
                        <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                        <div className='w-[80%]'>
                            <h3 className='text-xl font-bold'>562/11-A</h3>
                            <p className='text-base text-gray-600  font-normal overflow-x-scroll scrollbar-thin text-nowrap h-15'>{ride?.destination}</p>
                        </div>
                    </div>
                    <hr className='w-[80%] absolute border-1 right-4'/>
                    <div className='flex items-center gap-2 justify-start py-3 px-1'>
                        <i className="ri-bank-card-2-fill h-10 w-10  flex items-center justify-center"></i>
                        <div >
                            <h3 className='text-xl font-bold'>₹{ride?.fare}</h3>
                            <p className='text-base text-gray-600  font-normal overflow-x-scroll scrollbar-thin text-nowrap h-15'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2 w-full'>
                <button
                onClick={()=>{
                    scrpp(true)
                    confirmRide()

                }}
                className=' px-14 active:bg-green-700 bg-green-500 text-white font-semibold p-2 rounded-lg' type="submit">Accept </button>
                <button
                onClick={()=>{
                    srpp(false);
                }}
                className=' px-14 active:bg-gray-500 bg-gray-300 text-white font-semibold p-2 rounded-lg' type="submit">Reject </button>
                </div>
                </div>
                
            </div>
           
      
      )
    }
    
    export default RidePopUp  
  