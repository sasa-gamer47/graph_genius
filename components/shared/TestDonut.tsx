
"use client"

import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {


    state = {
        
        series: [{
            name: 'Bubble1',
            data: [
                { x: new Date('1991-01-01 GMT').getTime(), y: 15 },
                { x: new Date('1992-01-01 GMT').getTime(), y: 20 },
                { x: new Date('1993-01-01 GMT').getTime(), y: 33 },
                { x: new Date('1994-01-01 GMT').getTime(), y: 45 },
            ]
        }],
        
        options: {},
    }

    
  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Donut;