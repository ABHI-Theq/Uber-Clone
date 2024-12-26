import React from 'react'

function VehiclePanel({vp,svp,scrp,fare,svt}) {
  return (
    <div  >
          <div className="flex items-center  justify-between">
          <h2 className='text-xl font-bold mb-4 mt-[15px]'>Choose a Vehicle</h2>
          <i 
            className={`ri-arrow-down-double-line  ${vp? '':'hidden'} `}
            onClick={()=>svp(false)}
            ></i>
          </div>
              <div 
              onClick={(e)=>{
                scrp(true)
                svp(false)
                svt('car')
              }}
              className='flex w-full rounded-xl active:border-black border-2 py-3 px-1 mb-2 items-center '>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <div className='w-1/2 ml-2 '> 
                  <h4 className='text-base font-medium'>UberGo <span className=''><i className="ri-user-fill"></i>4</span></h4>
                  <h5 className='text-sm font-medium'>2 mins away</h5>
                  <p className='text-xs font-normal text-gray-600'>Affordable car ride</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{fare['car']}</h2>
              </div>
              
              <div 
              onClick={(e)=>{
                scrp(true)
                svt('motorcycle')

              }}
              className='flex w-full rounded-xl active:border-black border-2 py-3 px-1 mb-2 items-center '>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2 ml-5 '> 
                  <h4 className='text-base font-medium'>Moto<span className='ml-1'><i className="ri-user-fill"></i>1</span></h4>
                  <h5 className='text-sm font-medium'>3 mins away</h5>
                  <p className='text-xs font-normal text-gray-600'>Affordable motorcycle ride</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{fare['motorcycle']}</h2>
              </div>

              <div
              onClick={(e)=>{
                scrp(true)
                svt('auto')

              }}
              className='flex w-full rounded-xl active:border-black border-2 py-3 px-1 mb-2 items-center '>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='w-1/2 ml-5 '> 
                  <h4 className='text-base font-medium'>UberAuto<span className='ml-2'><i className="ri-user-fill"></i>3</span></h4>
                  <h5 className='text-sm font-medium'>2 mins away</h5>
                  <p className='text-xs font-normal text-gray-600'>Affordable Auto ride</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{fare['auto']}</h2>
              </div>
        </div>

  )
}

export default VehiclePanel