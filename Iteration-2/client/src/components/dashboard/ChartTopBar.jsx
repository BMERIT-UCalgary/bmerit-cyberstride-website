import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


function ChartTopBar({ chartTitle, setChartTitle }) {

    const navigate = useNavigate();
    const location = useLocation();

    const isGraphView = location.pathname === '/graphview';


    return (
        <div className='flex justify-between w-full h-fit'>


            {/* Left Buttons */}
            <div className='flex flex-row gap-2'>
                {
                    !isGraphView ?
                        <button
                            title='Expand Graph'
                            onClick={() => {
                                navigate('/graphview')
                            }}
                        >
                            {/* <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5" />
                            </svg> */}
                        </button>
                        :
                        <button
                            title='Return to dashboard'
                            onClick={() => {
                                navigate('/dashboard')
                            }}
                        >
                            {/* <svg className="w-6 h-6 text-gray-800 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg> */}

                        </button>
                }
                <button
                    title='Compare Graphs'
                >
                    {/* <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 18v2h6V4H4v2m16 12v2h-6V4h6v2M6.49545 14.4954 4.00003 12m0 0 2.49542-2.49543M4.00003 12h5.94809m7.49798 2.5539L20 12m0 0-2.5539-2.55392M20 12h-5.8319" />
                    </svg> */}
                </button>
            </div>

            {/* Chart Title */}
            <div className="relative inline-block w-fit">
                <select
                    className="block appearance-none text-center w-full bg-transparent text-gray-800 py-2 px-4 pr-10 rounded-md focus:outline-none hover:cursor-pointer "
                    value={chartTitle}
                    onChange={(e) => setChartTitle(e.target.value)}
                >
                    <option value="Right Hand Force">Right Hand Force</option>
                    <option value="Left Hand Force">Left Hand Force</option>
                    <option value="Bilateral Hand Force">Bilateral Hand Forces</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                        />
                    </svg>
                </div>
            </div>

            {/* Right Buttons */}
            <button>
                {/* <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                </svg> */}
            </button>


        </div>
    )
}

export default ChartTopBar