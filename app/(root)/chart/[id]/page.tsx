

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ApexChart from '@/components/shared/ApexChart';
import { getChartById } from '@/lib/actions/chart.actions';
import { AnnoyedIcon } from 'lucide-react';


async function Page({ params: { id } }: { params: {  id: string} }) {
    
    // if (typeof window === "undefined") return;
    if (!id) return null;

    const chart = await getChartById(id)
    
    // const calcArithmeticAverage = (numbers: number[]) => {
    //     let sum = 0
    //     console.log('nums' + numbers);
        

    //     for (let i = 0; i < numbers.length; i++) {
    //         sum += numbers[i]
            
    //     }

    //     return (sum / numbers.length).toFixed(2)
    // }

    // Calculate Arithmetic Average
const calcArithmeticAverage = (...numberArrays: number[][]) => {
    const flattenedNumbers = numberArrays.flat();
    let sum = 0;

    for (let i = 0; i < flattenedNumbers.length; i++) {
        sum += flattenedNumbers[i];
    }

    return (sum / flattenedNumbers.length).toFixed(2);
};

// Calculate Median
const calcMedian = (...numberArrays: number[][]) => {
    const flattenedNumbers = numberArrays.flat();
    const sortedNumbers = flattenedNumbers.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        const middleValues = sortedNumbers.slice(middleIndex - 1, middleIndex + 1);
        return ((middleValues[0] + middleValues[1]) / 2).toFixed(2);
    } else {
        return sortedNumbers[middleIndex].toFixed(2);
    }
};

// Calculate Mode
const calcMode = (...numberArrays: number[][]) => {
    const flattenedNumbers = numberArrays.flat();
    const frequencyMap: { [key: number]: number } = {};

    // Count the frequency of each number
    flattenedNumbers.forEach((num) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    let mode: number[] = [];
    let maxFrequency = 0;

    // Find the mode(s)
    Object.keys(frequencyMap).forEach((key: any) => {
        const frequency = frequencyMap[key]

        if (frequency > maxFrequency) {
            mode = [parseInt(key, 10)];
            maxFrequency = frequency;
        } else if (frequency === maxFrequency) {
            mode.push(parseInt(key, 10));
        }
    });

    return mode.length === flattenedNumbers.length ? "No mode" : mode.map((m) => m.toFixed(2)).join(", ");
};

// Example usage



    return (
        <>
        <main>
            <Card className='w-full bg-base-200 mb-10 shadow-lg border-none'>
                    <CardHeader>
                        <CardTitle className='text-center'>{chart.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col py-2 justify-between w-full items-center'>
                        <div className='w-1/2'>
                            <ApexChart type={chart.type} options={chart.options} series={chart.series} width={100}  />

                        </div>
                        <CardDescription className='px-20  w-full'>
                            {chart.description}
                        </CardDescription>
                        <div className="divider"></div>
                        <div className='w-full px-5 py-2 rounded-box bg-base-100'>
                            <p>arithmetic average: {calcArithmeticAverage(chart.series)}</p>
                            <p>mode: {calcMode(chart.series)}</p>
                            <p>median: {calcMedian(chart.series)} </p>
                        </div>
                    </CardContent>
                    <CardFooter className='flex items-center justify-around mt-5'>
                        {/* <p>{chart.createdAt}</p> */}
                        <p>{chart.type}</p>
                    </CardFooter>
                </Card>
        
        </main>
        </>
    );
}

export default Page