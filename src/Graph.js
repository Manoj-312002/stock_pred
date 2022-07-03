import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./style.css";

const Chart = require("react-chartjs-2").Chart;
function Graph(val) {
const getValues=(data)=>{
    let l=[]
    for(var i in data){
        l.push(data[i])
    }
    return l;
}

const getKeys=(data)=>{
    let l=[]
    for(var i in data){
        l.push(i)
    }
    return l;
}
const min= (a,b)=>{
    if(a>b)return b;
    return a;
}
const max= (a,b)=>{
    if(a<b)return b;
    return a;
}

// const keys=getKeys(val.predicted);
// const actual=getValues(val.actual);
// const predicted=getValues(val.predicted);

const actual=val.actual.data;
const predicted=val.predicted.data;
const time=val.time;
console.log("From Graph :",val )
const chartColors = {
  red: "rgb(255, 99, 132)",
  blue: "rgb(54, 162, 235)"
};

const color = Chart.helpers.color;
const data = {
  datasets: [
    {
        label: "Actual Stock Value",
        backgroundColor: color(chartColors.red)
          .alpha(0.5)
          .rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: actual
      },
      {
        label: "Predicted Stock Value",
        backgroundColor: color(chartColors.blue)
          .alpha(0.5)
          .rgbString(),
        borderColor: chartColors.blue,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: predicted
      },
  ]
};

const options = {
         tooltips: {
            callbacks: {
              label: function(tooltipItem) {                
                var index = tooltipItem.index
                console.log(tooltipItem)
                return tooltipItem.yLabel+"@Time "+time[index];
              }
            }
          },
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales:{
    xAxes: [{
        type: 'linear',
        ticks: {
           min: val.minT,
           max: val.maxT,
           minUnit: "second",
           stepSize: 1 //interval between ticks
        }
        // ticks: {
        //     displayFormats: 1,
        //     maxRotation: 0,
        //     minRotation: 0,
        //     stepSize: 1,
        //     maxTicksLimit: 30,
        //     minUnit: "second",
        //     source: "auto",
        //     autoSkip: true,
        // }
     }]
  }
};

  return (
    <div className="graphDisplay">
      <Line data={data} options={options} />
    </div>
  );
}

export default Graph;
