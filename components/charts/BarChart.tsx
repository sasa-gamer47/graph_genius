"use client";

import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    options?: object;
    series?: any;
    labels?: string[];
    type?: 'bar';
    width?: number;
}


class BarChart extends Component<BarChartProps> {
  // Default values in case props are not provided
    static defaultProps: BarChartProps = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E'],
        type: 'bar',
        width: 100,
    };

    render() {
        const { options, series, labels, type, width } = this.props;

        // console.log(series, labels, type, [44, 55, 41, 17, 15]);
        

        return (

            <Chart options={options} series={series} labels={labels} type={type} width={`${width}%`} />
        );
    }
}

export default BarChart;
