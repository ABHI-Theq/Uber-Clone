import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div >
      <div className="bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom bg-no-repeat w-full pt-8 flex justify-between flex-col h-screen bg-red-400">
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white  p-4 pb-7'>
          <h2 className='text-3xl font-bold '>Get Started With Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home