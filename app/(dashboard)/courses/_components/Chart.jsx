'use client'

import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
    const chartData = Array.from(data.entries().map(([definition, keywords]) => ({
        definition, 
        'Number of keywords': keywords.length,
        keywords
    }))) 
    
    // https://recharts.org/en-US/examples/CustomContentOfTooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            const keywords = payload[0].payload.keywords;
            return (
                <div style={{ background: 'white', border: '1px solid #ccc', padding: 10 }}>
                <strong>{label}</strong>
                <p>Actions: {keywords.join(', ')}</p>
                </div>
            );
        }
      
        return null;
    };

    return (
        <ResponsiveContainer width="50%" height={300}>
            <BarChart 
                width={500} 
                height={300} 
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="definition" />
                <YAxis allowDecimals={false} domain={[0, (dataMax) => dataMax + 1]} />
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Bar dataKey={"Number of keywords"} fill="oklch(0.424 0.199 265.638)" activeBar={<Rectangle fill="oklch(0.882 0.059 254.128)" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart