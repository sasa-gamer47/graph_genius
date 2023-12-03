"use client";

import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface RadialBarChartProps {
    options?: object;
    series?: any;
    labels?: string[];
    type?: 'radialBar';
    width?: number;
}


class RadialBarChart extends Component<RadialBarChartProps> {
  // Default values in case props are not provided
    static defaultProps: RadialBarChartProps = {
        options: {},
        series: 44,
        labels: ['A'],
        type: 'radialBar',
        width: 100,
    };

    render() {
        const { options, series, labels, type, width } = this.props;

        // console.log(series, labels, type, [44, 55, 41, 17, 15]);
        

        return (

            <Chart options={options} series={series}  type={type} width={`${width}%`} />
        );
    }
}

export default RadialBarChart;
