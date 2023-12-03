"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { ChartValidation } from "@/lib/validations/chart";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { createChart } from "@/lib/actions/chart.actions";

function CreateChartForm() {
  const pathname = usePathname();
  const [datasetsCount, setDatasetsCount] = useState("1");
    const [longestDatasetData, setLongestDatasetData] = useState(0);
    const [chartType, setChartType] = useState('line')

  const defaultValues = {
    title: "",
    type: "line",
    datasetsCount: "1",
    datasets: [],
    labels: [],
  } as {
    title: string;
    type: string;
    datasetsCount: string;
    datasets?: any[];
    labels?: any[];
  };

  const updateLongestDatasetData = (datasets: any[]) => {
    let longestLength = 0;
    let longestName = "";
    for (let i = 0; i < datasets.length; i++) {
      let currentLength = datasets[i].data.length;
      let currentName = datasets[i].name;
      if (currentLength > longestLength) {
        longestLength = currentLength;
        longestName = currentName;
      }
    }
    setLongestDatasetData(longestLength - 1);
  };

  const handleLabelInputChange = (event: any, index: number) => {
    const labels = form.getValues("labels");
    labels[index] = event.target.value;
    form.setValue("labels", labels);
    form.trigger("labels");
  };

  const convertData = (values: z.infer<typeof ChartValidation>) => {
    const datasets = values.datasets;
    for (let i = 0; i < datasets.length; i++) {
      const data = datasets[i].data;
      if (!data) return;
      for (let j = 0; j < data.length; j++) {
        if (data[j] !== "") {
          data[j] = Number(data[j]);
        } else {
          data.splice(j, 1);
          j--;
        }
      }
    }
    return values;
  };

  const handleSubmit = async (values: z.infer<typeof ChartValidation>) => {
    convertData(values);

    console.log(values);
    

    let chart;

    if (
      values.type == "pie" ||
      values.type == "donut" ||
      values.type == "polarArea" ||
      values.type == "radialBar"
    ) {
      chart = {
        title: values.title,
        description: "This is my first chart",
        tags: [],
        type: values.type,
        options: {
          chart: {
            id: values.title + "#" + Math.round(Math.random() * 100000),
          },
          xaxis: {
            categories: values.labels,
          },
          labels: values.labels,
        },
        series: values.datasets[0].data,
        path: "/my-charts", //pathname,
        author: "",
      };
    } else {
      chart = {
        title: values.title,
        description: "This is my first chart",
        tags: [],
        type: values.type,
        options: {
          chart: {
            id: values.title + "#" + Math.round(Math.random() * 100000),
          },
          xaxis: {
            categories: values.labels,
          },
          labels: values.labels,
        },
        series: values.datasets,
        path: "/my-charts", //pathname,
        author: "",
      };
    }

    const createdChart = await createChart(chart);
    console.log(createdChart);
  };

  const form = useForm<z.infer<typeof ChartValidation>>({
    resolver: zodResolver(ChartValidation),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "datasets",
  });

  const [dataInputsCount, setDataInputsCount] = useState(
    Array(Number(datasetsCount)).fill([1])
  );

  const chartTypes = [
    "line",
    "bar",
    "pie",
    "donut",
    "area",
    "scatter",
    "radar",
    "polarArea",
  ];

  useEffect(() => {
    setDataInputsCount(Array(fields.length).fill([1]));
  }, [fields.length]);

  useEffect(() => {
    updateLongestDatasetData(form.getValues("datasets"));
  }, [dataInputsCount, form]);

  useEffect(() => {
    if (
      chartType == "pie" ||
      chartType == "donut" ||
      chartType == "polarArea" ||
      chartType == "radialBar"
    ) {
      setDatasetsCount("1");
    } else {
      setDataInputsCount([...dataInputsCount, [1]]);
    }
  }, [datasetsCount, chartType]);

  const handleInputChange = (event: any, datasetIndex: number, dataIndex: number) => {
    if (dataIndex === dataInputsCount[datasetIndex].length - 1) {
      setDataInputsCount(prevDataInputsCount => {
      const newDataInputsCount = prevDataInputsCount.map((count, index) => {
          if (index === datasetIndex) {
              return [...count, count.length + 1]; // Use spread operator to create a new array
          } else {
              return count;
          }
      });
      return newDataInputsCount;
  });

    } else if (event.target.value.trim() === "") {
      setDataInputsCount((prevDataInputsCount) => {
        const newDataInputsCount = prevDataInputsCount.map((count, index) => {
          if (index === datasetIndex) {
            const fieldName = form.getValues(`datasets.${datasetIndex}.data[${dataIndex}]`);
            if (!fieldName) return;
            const dataNumber = Number(fieldName.split('.').pop());
            return count.slice(0, dataNumber).concat(count.slice(dataNumber + 1));
          } else {
            return count;
          }
        });
        return newDataInputsCount;
      });

      const data = form.getValues(`datasets.${datasetIndex}.data`);
      data.splice(dataIndex, 1);
      form.setValue(`datasets.${datasetIndex}.data`, data);
      form.trigger(`datasets.${datasetIndex}.data`);

      if (data.length === 0) {
        form.setValue(`datasets.${datasetIndex}.data[${dataIndex + 1}]`, '');
        form.trigger(`datasets.${datasetIndex}.data[${dataIndex + 1}]`);
      }
    }
  };




    return (
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10 bg-base-200 p-2.5 border-base-100 rounded-box">
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <h2 className="text-lg text-semibold">Chart title</h2>
                            </FormLabel>
                            <FormControl>
                                <Input className="input input-bordered" placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                {/* This is the chart title */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <h2 className="text-lg text-semibold">Chart type</h2>
                            </FormLabel>
                            <FormControl>
                                <select className="select select-bordered w-full" onChange={(e) => {
                                    field.onChange(e)
                                    setChartType(e.target.value)

                                    if (e.target.value == 'pie' || e.target.value == 'donut' || e.target.value == 'polarArea' || e.target.value == 'radialBar') { 
                                        setDatasetsCount('1')
                                        setLongestDatasetData(form.getValues('datasets')[0].data.length)
                                    }
                                }} defaultValue={field.value}>
                                    {/* <option disabled selected>SelectChart type</option> */}
                                    {chartTypes.map((type, index) => (
                                        <option className="flex items-center justify-center" key={index} value={type}>{type}</option> 
                                        // className="bg-base-200 p-4 text-lg hover:bg-red-300"
                                        ))}
                                </select>
                            </FormControl>
                            <FormDescription>
                                {/* This is the chart title */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name='datasetsCount'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <h2 className="text-lg text-semibold">Datasets count</h2>
                            </FormLabel>
                            <FormControl>
                                <Input onChange={(e) => {
                                    field.onChange(e);

                                    if (chartType == 'pie' || chartType == 'donut' || chartType == 'polarArea' || chartType == 'radialBar') {
                                        e.target.value = '1'
                                    }

                                    setDatasetsCount(e.target.value);
                                }} type="number" className="input input-bordered" placeholder="Datasets count" value={field.value} />
                            </FormControl>
                            <FormDescription>
                                {/* This is the chart title */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <div className="divider"></div>
                    
                                
                            
                    <div className="bg-base-100 p-2 m-1 rounded-box flex flex-col" >
                    <FormField
                        control={form.control}
                        name='datasets'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <div className="rounded-box flex justify-between">
                                    <div className="w-2/12">
                                        <h2 className="text-md text-semibold text-center">Datasets names</h2>
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-md text-semibold text-center">Datasets data</h2>
                                    </div>
                                </div>

                            </FormLabel>
                                <FormControl>
                                    <>
                                        {Number(datasetsCount) && Array.from({ length: Number(datasetsCount) }).map((_, datasetIndex) => (
                                                <div key={datasetIndex} className="bg-base-200 p-2 m-1 rounded-box flex gap-x-4">
                                                    <div>
                                                        <Input {...form.register(`datasets.${datasetIndex}.name`)} className="input" placeholder="Dataset name" />
                                                    </div>
                                                    <div className="grid grid-flow-row grid-cols-6 items-center gap-x-2">
                                                        {dataInputsCount[datasetIndex] && Array.from({ length: dataInputsCount[datasetIndex].length }).map((_, dataIndex) => (
                                                            <Input
                                                                key={dataIndex}
                                                                {...form.register(`datasets.${datasetIndex}.data[${dataIndex}]`)}
                                                                type="number"
                                                                className="input"
                                                                placeholder={`data ${dataIndex + 1}`}
                                                                onChange={(e) => handleInputChange(e, datasetIndex, dataIndex)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="bg-base-100 p-2 m-1 rounded-box flex flex-col" >

                    <FormField
                    control={form.control}
                    name='labels'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <h2 className="text-lg text-semibold">Labels</h2>
                            </FormLabel>
                            <FormControl>
                                <>
                                {Array.from({ length: longestDatasetData }).map((_, index) => (
                                    <div key={index} className="bg-base-200 p-2 m-1 rounded-box flex gap-x-4">
                                        <Input
                                            key={index}
                                            {...form.register(`labels.${index}`)}
                                            className="input"
                                            placeholder={`label ${index + 1}`}
                                            onChange={(e) => handleLabelInputChange(e, index)}
                                        />
                                    </div>
                                ))}
                                </>
                            </FormControl>
                            <FormDescription>
                                {/* This is the chart title */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                
                <button className="btn-accent btn" type="submit">Submit</button>
            </form>
        </Form>
    )
}

export default CreateChartForm