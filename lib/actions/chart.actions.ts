"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

// import User from "../models/user.model";
import Chart from "../models/chart.model";

interface Params {
    title: string,
    author: string,
    type: string,
    description: string,
    tags: string[],
    path: string,
    options: any,
    series: [number] | any,
}

export async function createChart({ title, author, type, description, tags, options, series, path }: Params
) {
    try {
        connectToDB();

        // console.log(path, description);
        


        const createdChart = await Chart.create({
            title,
            author,
            description,
            type,
            tags,
            options,
            series,
            path,
        });

        // console.log(createdChart, 'type: ' + type);
        

        // Update User model
        // await User.findByIdAndUpdate(author, {
        //   $push: { charts: createdChart._id },
        // });



        revalidatePath(path || '/my-charts');

        return createdChart
    } catch (error: any) {
        throw new Error(`Failed to create chart: ${error.message}`);
    }
}

export async function fetchCharts(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB()

        // const charts = await Chart.find()

        const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level charts) (a chart that is not a comment/reply).
        const chartsQuery = Chart.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pageSize)

        const charts = await chartsQuery.exec();

        const totalChartsCount = await Chart.countDocuments(); // Get the total count of charts

        const isNext = totalChartsCount > skipAmount + charts.length;

        // console.log('fetched charts: ', charts);
        

        return { charts, isNext }
    } catch (error: any) {
        throw new Error(`Something went wrong while fetching posts: ${error.message}`)
    }
}

export async function getChartById(id: string) {
    try {
        connectToDB()

        // const charts = await Chart.find()

        const chart = await Chart.findById(id)
        
        console.log(chart);
        

        return chart
    } catch (error: any) {
        throw new Error(`Something went wrong while fetching chart: ${error.message}`)
    }
}