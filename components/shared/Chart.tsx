interface Props {
    type: any,
    options: Object,
    series: any,
    labels: any,
    width: any,
}

import LineChart from "../charts/LineChart"
import DonutChart from "../charts/DonutChart"
import PieChart from "../charts/PieChart"
import BarChart from "../charts/BarChart"
import AreaChart from "../charts/AreaChart"
import RadialBarChart from "../charts/RadialBarChart"

const Chart = ({ type, options, series, labels, width }: Props) => { 
    switch (type) {
        case 'line': // 'radialBar' || 'scatter' || 'bubble' || 'heatmap' || 'candlestick' || 'boxPlot' || 'radar' || 'polarArea' || 'rangeBar' || 'rangeArea' || 'treemap':
            
            return (
                <LineChart type={type} options={options} series={series} width={width} />
            )
        case 'donut':          
            return (
                <DonutChart type={type} options={options} series={series} labels={labels} width={width} />
            )
        case 'pie':         
            return (
                <PieChart type={type} options={options} series={series} labels={labels} width={width} />
            )
        case 'bar': 
            return (
                <BarChart type={type} options={options} series={series} labels={labels} width={width} />
            )
        case 'area': 
            return (
                <AreaChart type={type} options={options} series={series} labels={labels} width={width} />
            )
        case 'radialBar': 
            return (
                <RadialBarChart type={type} options={options} series={series} labels={labels} width={width} />
            )
        default:
            break;
    }
}

export default Chart