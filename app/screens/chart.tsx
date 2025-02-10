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
