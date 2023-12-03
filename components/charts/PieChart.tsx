"use client";

import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface PieChartProps {
    options?: object;
    series?: any;
    labels?: string[];
    type?: 'pie';
    width?: number;
}


class PieChart extends Component<PieChartProps> {
  // Default values in case props are not provided
    static defaultProps: PieChartProps = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E'],
        type: 'pie',
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

export default PieChart;
