import React from 'react'
import ForceChart from '../components/dashboard/charts/ForceChart'
import ChartPanel from '../components/dashboard/ChartPanel'
import ChartTopBar from '../components/dashboard/ChartTopBar'
import MultiRangeSlider from '../components/dashboard/graphView/MultiRangeSlider'
// import RangeWithCharts from '../components/dashboard/graphView/RangeWithCharts'

function GraphView() {



    return (
        <div className=' w-full h-screen flex flex-col overflow-hidden'>
            <div className='p-5'>
                <ChartTopBar title={'Bilateral Hand Force'} />
            </div>
            <div className='w-full h-full px-12'>
                <ForceChart />
            </div>
            <div className='w-full h-full'>
                {/* <MultiRangeSlider min={0} max={100}/> */}
                {/* <RangeWithCharts/> */}
            </div>
        </div>
    )
}

export default GraphView