import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    type: {
        type: String,
        required: true,
        default: 'line',
    },
    tags: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    options: {
        chart: {
            id: {
                type: String,
                required: true,
            }
        },
        labels: {
            type: [String],
            required: true,
            default: true
        },
        xaxis: {
            categories: {
                type: [String],
                required: true
            }
        },
        useClasses: {
            type: Boolean,
            default: false,
            required: true
        },
        isClassFixed: {
            type: Boolean,
            default: false,
        },
    },
    series: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
    }

    // author:  {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
});

const Chart = mongoose.models.Chart || mongoose.model("Chart", chartSchema);

export default Chart;