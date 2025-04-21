import React from 'react'
import Puerta from '../components/custom/Puerta'

export default function GameDoor() {
  return (
    <div className='w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-extrabold mb-12 text-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.7)] tracking-wider'>
        ¿Cuál es la capital de EE. UU.?
      </h1>

      <div className='w-[85%] bg-gradient-to-r from-[#2b0000] via-[#3d0000] to-[#2b0000] flex justify-center gap-10 p-10 rounded-3xl shadow-[0_0_30px_rgba(255,0,0,0.4)] border-4 border-red-900'>
        <Puerta msg={"Washington D. C."} emoji={'👍'} />
        <Puerta msg={"New York"} emoji={'🧟'} />
        <Puerta msg={"Los Angeles"} emoji={'👻'} />
        <Puerta msg={"Chicago"} emoji={'🕷️'} />
      </div>
    </div>
  )
}



