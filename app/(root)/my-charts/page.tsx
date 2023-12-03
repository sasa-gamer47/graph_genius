


import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Chart from '@/components/shared/Chart';
import ApexChart from '@/components/shared/ApexChart';
import { fetchCharts } from '@/lib/actions/chart.actions';


async function Page() {
    
    // const sampleGraphData = [
    // {
    //     id: 1,
    //     title: 'Sales Overview',
    //     description: 'Monthly sales trends for the current year.',
    //     date: '2023-01-15',
    //     tags: ['Sales', 'Trends', 'Revenue'],
    //     type: 'Line Chart',
    //     thumbnail: 'https://via.placeholder.com/300',
    // },
    // {
    //     id: 2,
    //     title: 'Customer Demographics',
    //     description: 'Demographic distribution of your customer base.',
    //     date: '2023-02-02',
    //     tags: ['Demographics', 'Customers', 'Population'],
    //     type: 'Pie Chart',
    //     thumbnail: 'https://via.placeholder.com/300',
    // },
    // {
    //     id: 3,
    //     title: 'Website Traffic',
    //     description: 'Monthly website traffic analytics.',
    //     date: '2023-03-10',
    //     tags: ['Analytics', 'Traffic', 'Website'],
    //     type: 'Bar Chart',
    //     thumbnail: 'https://via.placeholder.com/300',
    // },
    // ];

//     const sampleChartData = [
//   {
//     id: 1,
//     title: 'Chart Card 1',
//     description: 'Description for Chart Card 1',
//     tags: ['tag1', 'tag2', 'tag3'],
//     createdAt: '2023-11-22T14:30:00Z',
//     type: 'line',
//     options: {
//       chart: {
//           id: 'apexchart-example-1',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//       },
//       series: [
//         {
//           name: 'series-1',
//           data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//         },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Chart Card 1',
//     description: 'Description for Chart Card 1',
//     tags: ['tag1', 'tag2', 'tag3'],
//     createdAt: '2023-11-22T14:30:00Z',
//     type: 'donut',
//     options: {
//       chart: {
//           id: 'apexchart-example-2',
//         },
//       labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//       series: [
//         30, 40, 35, 50, 49, 60, 70, 91, 125
//       ],
//       },
//   {
//     id: 3,
//     title: 'Chart Card 1',
//     description: 'Description for Chart Card 1',
//     tags: ['tag1', 'tag2', 'tag3'],
//     createdAt: '2023-11-22T14:30:00Z',
//     type: 'pie',
//     options: {
//       chart: {
//           id: 'apexchart-example-3',
//       },
//       labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//     },
//     series: [
//         30, 40, 35, 50, 49, 60, 70, 91, 125
//       ],
//       },
//     {
//     id: 4,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'bar',
//       options: {
//         chart: {
//             id: 'apexchart-example-4',
//           },
//           xaxis: {
//             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//           },
//         },
//         series: [
//           {
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//           },
//         ],
//       },
//       {
//         id: 5,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'area',
//       options: {
//         chart: {
//             id: 'apexchart-example-5',
//           },
//           xaxis: {
//             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//           },
//         },
//         series: [
//           {
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//           },
//       ],
//     },
//     {
//       id: 6,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'scatter',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//           },
//       ],
//     },
//     {
//       id: 7,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'heatmap',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//           },
//       ],
//     },
//     {
//       id: 8,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'radar',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//           },
//       ],
//     },
//     {
//       id: 9,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'treemap',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [
//                   {
//                     x: 'New Delhi',
//                     y: 218
//                   },
//                   {
//                     x: 'Kolkata',
//                     y: 149
//                   },
//                   {
//                     x: 'Mumbai',
//                     y: 184
//                   },
//                   {
//                     x: 'Ahmedabad',
//                     y: 55
//                   },
//                   {
//                     x: 'Bangaluru',
//                     y: 84
//                   },
//                   {
//                     x: 'Pune',
//                     y: 31
//                   },
//                   {
//                     x: 'Chennai',
//                     y: 70
//                   },
//                   {
//                     x: 'Jaipur',
//                     y: 30
//                   },
//                   {
//                     x: 'Surat',
//                     y: 44
//                   },
//                   {
//                     x: 'Hyderabad',
//                     y: 68
//                   },
//                   {
//                     x: 'Lucknow',
//                     y: 28
//                   },
//                   {
//                     x: 'Indore',
//                     y: 19
//                   },
//                   {
//                     x: 'Kanpur',
//                     y: 29
//                   }
//                 ]
//           },
//       ],
//       },
//     {
//       id: 10,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'candlestick',
//       options: {
//               chart: {
//                 id: 'apexchart-example-1'
//               },
//               xaxis: {
//                 type: 'datetime'
//               },
              
//             },
//       series: [
//         {
//           name: 'series-1',
//           data: [
//                 {
//                   x: new Date(1538778600000),
//                   y: [6629.81, 6650.5, 6623.04, 6633.33]
//                 },
//                 {
//                   x: new Date(1538780400000),
//                   y: [6632.01, 6643.59, 6620, 6630.11]
//                 },
//                 {
//                   x: new Date(1538782200000),
//                   y: [6630.71, 6648.95, 6623.34, 6635.65]
//                 },
//           ],
//         },
//       ],
//       },
//     {
//       id: 11,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'polarArea',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//       },
//     {
//       id: 12,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'rangeArea',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [
//                   {
//                     x: 'Jan',
//                     y: [-2, 4]
//                   },
//                   {
//                     x: 'Feb',
//                     y: [-1, 6]
//                   },
//                   {
//                     x: 'Mar',
//                     y: [3, 10]
//                   },
//                   {
//                     x: 'Apr',
//                     y: [8, 16]
//                   },
//                   {
//                     x: 'May',
//                     y: [13, 22]
//                   },
//                   {
//                     x: 'Jun',
//                     y: [18, 26]
//                   },
//                   {
//                     x: 'Jul',
//                     y: [21, 29]
//                   },
//                   {
//                     x: 'Aug',
//                     y: [21, 28]
//                   },
//                   {
//                     x: 'Sep',
//                     y: [17, 24]
//                   },
//                   {
//                     x: 'Oct',
//                     y: [11, 18]
//                   },
//                   {
//                     x: 'Nov',
//                     y: [6, 12]
//                   },
//                   {
//                     x: 'Dec',
//                     y: [1, 7]
//                   }
//                 ]
//           },
//       ],
//     },
//     {
//       id: 13,
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'rangeBar',
//       options: {
//         chart: {
//           id: 'apexchart-example-5',
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//         labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//       },
//         series: [
//           {
//             name: 'series-1',
//             data: [
//                   {
//                     x: 'Jan',
//                     y: [-2, 4]
//                   },
//                   {
//                     x: 'Feb',
//                     y: [-1, 6]
//                   },
//                   {
//                     x: 'Mar',
//                     y: [3, 10]
//                   },
//                   {
//                     x: 'Apr',
//                     y: [8, 16]
//                   },
//                   {
//                     x: 'May',
//                     y: [13, 22]
//                   },
//                   {
//                     x: 'Jun',
//                     y: [18, 26]
//                   },
//                   {
//                     x: 'Jul',
//                     y: [21, 29]
//                   },
//                   {
//                     x: 'Aug',
//                     y: [21, 28]
//                   },
//                   {
//                     x: 'Sep',
//                     y: [17, 24]
//                   },
//                   {
//                     x: 'Oct',
//                     y: [11, 18]
//                   },
//                   {
//                     x: 'Nov',
//                     y: [6, 12]
//                   },
//                   {
//                     x: 'Dec',
//                     y: [1, 7]
//                   }
//                 ]
//           },
//       ],
//     },
// //     {
// //       id: 14,
// //       title: 'Chart Card 1',
// //       description: 'Description for Chart Card 1',
// //       tags: ['tag1', 'tag2', 'tag3'],
// //       createdAt: '2023-11-22T14:30:00Z',
// //       type: 'bubble',
// //       options: {
// //   chart: {
// //     height: 350,
// //     type: 'bubble',
// //   },
// //   dataLabels: {
// //     enabled: false
// //   },
// //   fill: {
// //     opacity: 0.8
// //   },
// //   title: {
// //     text: 'Simple Bubble Chart'
// //   },
// //   xaxis: {
// //     tickAmount: 12,
// //     type: 'datetime',  // Change 'category' to 'datetime'
// //   },
// //   yaxis: {
// //     max: 50
// //   }
// // },
    
// //         series: [
// //           {
// //             name: 'series-1',
// //             data: [
// //       { x: new Date('1991-01-01 GMT').getTime(), y: 15 },
// //       { x: new Date('1992-01-01 GMT').getTime(), y: 20 },
// //       { x: new Date('1993-01-01 GMT').getTime(), y: 33 },
// //       { x: new Date('1994-01-01 GMT').getTime(), y: 45 },
// //             ],
// //           },
// //       ],
// //     },
//     {
//       id: 15,
      
//       title: 'Chart Card 1',
//       description: 'Description for Chart Card 1',
//       tags: ['tag1', 'tag2', 'tag3'],
//       createdAt: '2023-11-22T14:30:00Z',
//       type: 'radialBar',
//       options: {
//         chart: {
//             id: 'apexchart-example-6',
//         },
//         labels: ['Cricket']
//         },
//       series: [30],
//     },
// ];




    const { charts, isNext } = await fetchCharts()

    console.log('fetching charts');
    

    // console.log('charts: ', charts);
    

    return (
        <>
        <main>
            {charts.map((card) => (
                <Card key={card.id} className='w-full bg-base-200 mb-10 shadow-lg border-none'>
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col py-0 justify-between w-full'>
                        <div className='w-full flex justify-between'>
                            {/* <Chart type={card.type} options={card.options} series={card.series} labels={card?.labels || null} width={100}  /> */}
                            <ApexChart type={card.type} options={card.options} series={card.series} width={100}  />
                            {/* <Image src={card.thumbnail} className='w-3/12 rounded-lg' width='0' height='0' alt='' /> */}
                            <CardDescription className='flex justify-left w-full ml-5'>
                                {card.description}
                            </CardDescription>
                        </div>
                        <div className='flex gap-x-10 items-center justify-left mt-5'>
                            {/* {card.tags.map((tag) => (
                                <button key={card.id} className='btn bg-base-300 py-0 px-10'>#{tag}</button>
                            ))} */}
                        </div>
                    </CardContent>
                    <CardFooter className='flex items-center justify-around mt-5'>
                        {/* <p>{card.createdAt}</p> */}
                        <p>{card.type}</p>
                        <button className='btn btn-primary w-3/12'>View</button>
                    </CardFooter>
                </Card>

            ))}
        </main>
        </>
    );
}

export default Page

