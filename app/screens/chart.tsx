// import { View, Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const LineChartExample = ({ chartData, legend }: { chartData: number[]; legend: string }) => {
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
//     legend: [legend], // Hiển thị tên của biểu đồ
//   };

//   return (
//     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//     <LineChart
//       data={data}
//       width={screenWidth - 40}
//       height={250}
//       chartConfig={{
//         ...chartConfig,
//         backgroundGradientFrom: '#F3F4F6', 
//         backgroundGradientTo: '#F3F4F6', 
//         decimalPlaces: 2,
//         color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, 
//         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
//       }}
//       bezier
//       style={{
//         borderRadius: 16,
//         overflow: 'hidden',
//       }}
//     />
//   </View>
//   );
// };

// export default LineChartExample;

// import { View, Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const LineChartExample = ({ chartData, legend }: { chartData: number[]; legend: string }) => {
//   const screenWidth = Dimensions.get("window").width;

//   const chartConfig = {
//     backgroundGradientFrom: "rgb(196, 217, 255)",
//     backgroundGradientTo: "rgb(251, 251, 251)",
//     color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
//     strokeWidth: 2,
//     barPercentage: 0.5,
//   };

//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         data: chartData,
//         color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
//         strokeWidth: 2,
//       },
//     ],
//     legend: [legend],
//   };

//   return (
//     <View style={{ justifyContent: "center", alignItems: "center" }}>
//       <LineChart
//         data={data}
//         width={screenWidth - 40}
//         height={250}
//         chartConfig={{
//           ...chartConfig,
//           backgroundGradientFrom: "#F3F4F6",
//           backgroundGradientTo: "#F3F4F6",
//           decimalPlaces: 0, // Không hiển thị số thập phân
//           color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           propsForLabels: {
//             fontSize: 12, // Kích thước chữ nhãn trục Y
//           },
//           propsForDots: {
//             r: "6", // Kích thước chấm tại các điểm dữ liệu
//             strokeWidth: "2",
//             stroke: "#2563EB",
//           },
//         }}
//         formatYLabel={(value) => `${Math.round(parseFloat(value))} K`} // Định dạng nhãn trục Y
//         withDots={true} // Hiển thị chấm tại các điểm dữ liệu
//         withInnerLines={true} // Hiển thị đường lưới ngang để dễ đọc trục Y
//         withOuterLines={true} // Hiển thị đường viền ngoài
//         bezier
//         style={{
//           borderRadius: 16,
//           overflow: "hidden",
//         }}
//       />
//     </View>
//   );
// };

// export default LineChartExample;


import { View, Dimensions, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import React, { useState } from "react";

const LineChartExample = ({ chartData, legend }: { chartData: number[]; legend: string }) => {
  const screenWidth = Dimensions.get("window").width;

  // State để lưu giá trị và vị trí của điểm được nhấn
  const [selectedValue, setSelectedValue] = useState<{
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const chartConfig = {
    backgroundGradientFrom: "rgb(196, 217, 255)",
    backgroundGradientTo: "rgb(251, 251, 251)",
    color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: chartData,
        color: (opacity = 1) => `rgba(37,99,235,${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [legend],
  };

  // Xử lý khi nhấn vào điểm dữ liệu
  const handleDataPointClick = ({ value, x, y }: { value: number; x: number; y: number }) => {
    setSelectedValue({ value, x, y });
    // Tự động ẩn giá trị sau 2 giây (tùy chọn)
    setTimeout(() => setSelectedValue(null), 2000);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", position: "relative" }}>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={250}
        chartConfig={{
          ...chartConfig,
          backgroundGradientFrom: "#F3F4F6",
          backgroundGradientTo: "#F3F4F6",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontSize: 12,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#2563EB",
          },
        }}
        formatYLabel={(value) => `${Math.round(parseFloat(value))} K`}
        withDots={true}
        withInnerLines={true}
        withOuterLines={true}
        bezier
        onDataPointClick={handleDataPointClick} // Thêm sự kiện nhấn
        style={{
          borderRadius: 16,
          overflow: "hidden",
        }}
      />

      {/* Hiển thị giá trị khi nhấn */}
      {selectedValue && (
        <View
          style={[
            styles.tooltip,
            {
              left: selectedValue.x - 30, // Căn giữa tooltip so với chấm
              top: selectedValue.y - 40, // Đặt tooltip phía trên chấm
            },
          ]}
        >
          <Text style={styles.tooltipText}>{Math.round(selectedValue.value)} K</Text>
        </View>
      )}
    </View>
  );
};

// Styles cho tooltip
const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 5,
    borderRadius: 4,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default LineChartExample;