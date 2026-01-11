import React, { useEffect, useState } from 'react'
import ChartTopBar from './ChartTopBar'
import ForceChart from './charts/ForceChart'
import HandForceChart from './charts/HandForceChart'
import HandForceChartCopy from './charts/HandForceChartCopy'

/**
 * TODO: manage state in here
 * 
 * @param {*} param0 
 * @returns 
 */
function ChartPanel({ data, title, setChartTitle }) {


    useEffect(() => {
        console.log("Chart title: ", title)
        console.log("ChartPanel data : ", data)
    }, [title])

    return (
        <div className='w-full h-full bg-zinc-50 border-2 border-zinc-100 shadow-md p-4 bg-opacity-85 backdrop-blur-lg rounded-lg row-span-6 col-span-4 min-h-[50px]'>
            <ChartTopBar chartTitle={title} setChartTitle={setChartTitle} />
            <ForceChart data={data} />
        </div>




        // <div className='w-full h-full bg-zinc-50 border-2 border-zinc-100 shadow-md p-4 bg-opacity-85 backdrop-blur-lg rounded-lg row-span-6 col-span-4 min-h-[50px]'>
        //     <ChartTopBar chartTitle={chartTitle} setChartTitle={setChartTitle} />
        //     {chartTitle === "Right Force" ? (
        //         <ForceChart data={data} />
        //     ) : chartTitle === "Hand Forces Chart" ? (
        //         <HandForceChartCopy />
        //     ) : chartTitle === "Bilateral Hand Force" ? (
        //         <HandForceChart />
        //     ) : null}
        // </div>
    )
}

export default ChartPanel