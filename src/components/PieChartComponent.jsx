import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import stateData from '../components/data/stateData'; // Import stateData array
import '../../src/index.css'
import {motion, useCycle} from 'framer-motion'
import Chart from 'chart.js/auto';

const PieChartComponent = () => {
  const [selectedState, setSelectedState] = useState(null);
  

  const handleStateClick = (state) => {
    setSelectedState(state);
    
  };

  

  const renderCharts = () => {
    if (!selectedState) return null;

    const selectedStateData = stateData.find(state => state.state === selectedState);
    const cityLabels = selectedStateData.cities.map(city => city.name);
    const cityAreas = selectedStateData.cities.map(city => city.areaPercentage);

    const pieData = {
      labels: cityLabels,
      datasets: [
        {
          label: 'City Area Distribution',
          data: cityAreas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    const lineData = {
      labels: cityLabels,
      datasets: [
        {
          label: 'City Area',
          data: cityAreas,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    return (
      <div className='pie-div flex flex-col lg:flex lg:flex-row lg:justify-around lg:items-center mt-8 ' >
        <div>
          
          {/* <motion.h2 className='text-white text-xl md:text-2xl' >Pie Chart for City Area Distribution</motion.h2> */}
          <div className='md:w-[300px] w-[450px]' >
            <Pie data={pieData}   />
          </div>
        </div>
        <div>
          {/* <h2>Line Chart for City Area</h2> */}
          <div className='md:w-[400px] w-[450px]'>
            <Line data={lineData} />
          </div>
        </div>
      </div>
    );
  };

  

  const getHue = (temperature) => {
    return (temperature + 18) * 8;
  };
  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
  }
  

  return (
    <div>
    <motion.h1 className='text-white font-bold uppercase  lg:uppercase lg:text-5xl lg:font-bold lg:text-white text-3xl'
      initial= {{opacity: 0.5, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 20
      }}
      
    >States Data</motion.h1>
    <div className="flex flex-wrap flex-1 gap-3 mt-5">
      {stateData.map((state, index) => (
        <motion.div
        whileHover={{scale:1.05 }} whileTap={{scale: 0.93}}  drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
       
          key={state.state}
          className=" cursor-pointer border-none rounded-md m-auto w-[200px] h-[100px] text-center flex flex-col justify-center items-center"
          style={{ backgroundColor: `hsl(${getHue(state.temperature)}, 100%, 50%)`, transformStyle: 'preserve-3d' }} // Adjusted background color calculation  
          onClick={() => handleStateClick(state.state)}
        >
          
          <motion.h3 className='font-bold lg:font-bold text-xl lg:text-xl '    >{state.state}</motion.h3>
          <motion.p  className='text-white opacity-60' >{state.temperature}°C</motion.p>
          
        </motion.div>
      ))}
    </div>
    {renderCharts()}
  </div>
  );
};

export default PieChartComponent;

 

























// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import '../../src/index.css'

// const PieChartComponent = () => {
//   // Define sample data for the pie chart
//   const data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: 'Sample Pie Chart',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'red',
//           'blue',
//           'yellow',
//           'green',
//           'purple',
//           'orange',
//         ],
//       },
//     ],
//   };

//   // Define chart options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div>
//       <h2>Sample Pie Chart</h2>
//       <div className="pie">
//       <Pie data={data} options={options}  />
//       </div>
//     </div>
//   );
// };

// export default PieChartComponent;