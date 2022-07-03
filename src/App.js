import React from "react";
import {useEffect,useState} from "react";
import Graph from "./Graph"

function App() {
    const API="https://jsrambz1uf.execute-api.us-west-1.amazonaws.com/default/get-records";    
    const Stocks=["Google","Tesla","Adobe","Microsoft","Meta","Netflix","Amazon","Oracle","Apple","Nvidia"]
    const [stockPrice,setStockPrice]=useState({actual:0,predicted:0});
    const [name,setName]=useState(null);
      
    const filterTheData = (data,len) => {
          let processed = []
          let time =[]
          let max=0
          let min=100000000
          let num=0
          for(let i in data){
            time.push(i);
            if(data[i][name]['N']<min){min=data[i][name]['N'];}
            if(data[i][name]['N']>max){max=data[i][name]['N'];}
            processed.push({x:num,y:data[i][name]['N']});
            num++;
          }
        //   console.log(moment(num,"HH:MM:SS")._i);
          return {time:time.slice(Math.max(time.length-len,0)),min:min,max:max,data:processed.slice(Math.max(processed.length - len, 0))} ; //returns recent hundred
    }
   
//     const filterTheData = (data) => {
//         let processed = {}
//         for(let i in data){
//             processed[i]=data[i][name]['N'];
//         }
//         return processed
//   }
 

    const populateData = async () => {
       if(name==null)return;
       fetch(API)
      .then(res => res.json())
      .then(
        (result) => {
          var p =filterTheData(result[0],30);
        
          var a =filterTheData(result[1],30);
          
        //   Removing as they are out of allign ment by one element
            p.data=p.data.slice(Math.max(p.data.length - 30, 1))
            a.data.pop()
            a.time.pop()
            console.log(p.data[0].x-1)

        //   p.x=p.x.slice(Math.max(p.length - 99, 0));
        //   p.y=p.y.slice(Math.max(p.length - 99, 0));
        //   a.x.pop();
        //   a.y.pop();
        

        setStockPrice({actual:a,predicted:p, minT:a.data[0].x-1,maxT:p.data[0].x+30,time:a.time});
        }
      ).catch(()=>{
        console.log("API Down")
      })
    }

    // function reassignName(){
    //     populateData();
    //     setTimeout(reassignName, 10000);
    // }
    // reassignName();  

    const TIME_MS = 10000;

    useEffect(()=>{
        const interval = setInterval(() => {
            populateData();
            console.log("Re-reendering graph")
        }, TIME_MS);
        return () => clearInterval(interval);
    },[])

    useEffect(()=>{
        populateData();
    },[name])
    return (
      <div className="App">
        {Stocks.map((stockName)=>{
            return(
                <button key={stockName} onClick={(e)=>{setName(e.target.value)}} value={stockName.toLowerCase()}>{stockName}</button>
            )
        })}
        <h1>--{name}--</h1>
        <Graph {...stockPrice}/>
      </div>
    );
  }



 
export default App;