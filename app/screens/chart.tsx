import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartExample = () => {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "rgb(196, 217, 255)",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "rgb(251, 251, 251)",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgb(160, 142, 251), ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const data = {
    labels: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [100, 200, 300, 400, 500, 100,200,300,400,500,400,500],
        color: (opacity = 1) => `rgb(57, 30, 191), ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Chi tiêu"],
  };

 
  return (
    <View style = {{justifyContent:'center', alignItems:'center'}}>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default LineChartExample;
