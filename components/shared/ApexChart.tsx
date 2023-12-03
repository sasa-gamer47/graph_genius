// charts.tsx/jsx

'use client' // if you use app dir, don't forget this line

import dynamic from 'next/dynamic';
import Chart from "react-apexcharts"


interface Props {
    type: any,
    options: Object,
    series: any,
    width: number,
}

const ApexChart = ({ type, options, series, width }: Props) => {
    !width ? width = 100 : ''
    
    return(
        <>
            <Chart type={type} options={options} series={series} height={'auto'} width={`${width}%`} />
            {/* not working: bubble ; boxPlot will not be applied */}
        </>
    )
    
}



export default ApexChart