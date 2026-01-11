import { useState } from 'react'
import WideMetricPanel from '../components/dashboard/WideMetricPanel.jsx'
import TallMetricPanel from '../components/dashboard/TallMetricPanel.jsx'
import Background from '../components/generic/Background.jsx'
import ChartPanel from '../components/dashboard/ChartPanel.jsx'
import { useNavigate } from 'react-router-dom';




function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <Background>
        {/* Grid 6x8 */}
        <div className='relative w-full h-full p-5 grid grid-cols-6 grid-rows-8 gap-8 '>
          <WideMetricPanel metricTitle={"Average Speed"} metricQuantity={"1.4"} units={"m/s"} />
          <WideMetricPanel metricTitle={"Distance"} metricQuantity={"0.94"} units={"km"} />
          <WideMetricPanel metricTitle={"Steps"} metricQuantity={"1,304"} />

          <ChartPanel/>

          <TallMetricPanel metricTitle={"Step Length"} metricQuantity={"63"} shape={"tall"} units={"cm"} />
          <TallMetricPanel metricTitle={"Heart Rate"} metricQuantity={"72"} shape={"tall"} units={"bpm"} />

          {/* Session Panel */}
          <div className='bg-gradient-to-tr from-green-200 to-blue-300 bg-opacity-85 backdrop-blur-lg rounded-lg row-span-3 col-span-2 min-h-[50px]'>
            <div className='flex flex-col h-full w-full p-5'>
              <p className='text-xl text-white h-1/3'>Session Duration</p>
              <div className='flex items-center h-full gap-2'>
                <p className='text-5xl text-white font-bold'>1.1hr</p>
              </div>
              <div className='flex justify-end h-1/3 w-full'>
                <button className='flex justify-between items-center h-full w-fit p-1 px-3 bg-white rounded-xl'
                  onClick={()=> {
                    navigate('/')
                  }}
                >
                  End Session
                  <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </Background>
    </>
  )
}

export default Dashboard
