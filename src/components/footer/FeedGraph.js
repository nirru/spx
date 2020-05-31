import React from 'react';
import { Chart } from "react-google-charts";

export const FeedGraph = ({feeds}) => {
    let result = feeds.map(item => {
        return {x:item.objectID,y:item.points}
    });
    result = result.sort((a, b) => (a.x > b.x) ? 1 : -1);
    result.unshift(['x','Votes'])
    const output = result.map(function(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    });
    return (
        <div>
            <Chart
                width="100%"
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={output}
                options={{
                    hAxis: {
                        title: 'ID',
                    },
                    vAxis: {
                        title: 'Votes/Points',
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};