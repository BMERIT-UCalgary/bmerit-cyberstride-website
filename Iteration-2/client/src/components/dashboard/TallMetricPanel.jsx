import React from 'react'

/**
 * Example usage:  <MetricPanel metricTitle={"Average Speed"} metricQuantity={"1.4m/s"} shape={"wide"}/>

 * 
 * @param {*} props 
 * @returns 
 */
function TallMetricPanel(props) {

    const { metricTitle, metricQuantity, units } = props

    return (
        <div className={`bg-zinc-50 border-2 border-zinc-100 shadow-md bg-opacity-85 backdrop-blur-lg rounded-lg row-span-3 min-h-[50px]`}>
            <div className='flex flex-col h-full w-full p-5'>
                <p className='text-xl h-1/3'>{metricTitle}</p>
                <div className='flex items-center h-full gap-2'>
                    <div className='flex items-end gap-2'>
                        <p className='text-5xl font-bold'>{metricQuantity}</p>
                        <p className='text-xl font-semibold'>{units}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TallMetricPanel