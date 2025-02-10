// // import { View, Dimensions } from "react-native";
// // import { LineChart } from "react-native-chart-kit";

// // const LineChartExample = () => {
// //   const screenWidth = Dimensions.get("window").width;

// //   const chartConfig = {
// //     backgroundGradientFrom: "rgb(196, 217, 255)",
// //     backgroundGradientFromOpacity: 0,
// //     backgroundGradientTo: "rgb(251, 251, 251)",
// //     backgroundGradientToOpacity: 0.5,
// //     color: (opacity = 1) => `rgb(37,99,235), ${opacity})`,
// //     strokeWidth: 2,
// //     barPercentage: 0.5,
// //     useShadowColorFromDataset: false,
// //   };

// //   const data = {
// //     labels: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"],
// //     datasets: [
// //       {
// //         data: [100, 200, 300, 400, 500, 450,200,300,400,500,400,500],
// //         color: (opacity = 1) => `rgb(37,99,235), ${opacity})`,
// //         strokeWidth: 2,
// //       },
// //     ],
// //     legend: ["Chi tiêu"],
// //   };

 
// //   return (
// //     <View style = {{justifyContent:'center', alignItems:'center'}}>
// //       <LineChart
// //         data={data}
// //         width={screenWidth}
// //         height={250}
// //         chartConfig={chartConfig}
// //         bezier
// //       />
// //     </View>
// //   );
// // };

// // export default LineChartExample;
// import React from 'react';
// import { View, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const LineChartExample = ({ chartData }: { chartData: number[] }) => {
//   const screenWidth = Dimensions.get('window').width;

//   const chartConfig = {
//     backgroundGradientFrom: 'rgb(196, 217, 255)',
//     backgroundGradientTo: 'rgb(251, 251, 251)',
//     color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
//     strokeWidth: 2,
//     barPercentage: 0.5,
//   };

//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         data: chartData,
//         color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
//         strokeWidth: 2,
//       },
//     ],
//     legend: ['Chi tiêu'],
//   };

//   return (
//     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//       <LineChart
//         data={data}
//         width={screenWidth - 40}
//         height={250}
//         chartConfig={chartConfig}
//         bezier
//       />
//     </View>
//   );
// };

// export default LineChartExample;

import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartExample = ({ chartData, legend }: { chartData: number[]; legend: string }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: 'rgb(196, 217, 255)',
    backgroundGradientTo: 'rgb(251, 251, 251)',
    color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: chartData,
        color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [legend], // Hiển thị tên của biểu đồ
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={250}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default LineChartExample;
