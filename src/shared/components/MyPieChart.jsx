import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const MyPieChart = () => {
  const data = [
    { name: "Seoul", population: 21500000, color: "rgba(131, 167, 234, 1)" },
    { name: "Toronto", population: 2800000, color: "rgba(249, 162, 60, 1)" },
    { name: "Beijing", population: 21700000, color: "rgba(134, 65, 244, 1)" },
    { name: "New York", population: 8538000, color: "rgba(43, 218, 115, 1)" },
    { name: "Moscow", population: 11920000, color: "rgba(144, 190, 239, 1)" },
  ];

  return (
    <View>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default MyPieChart;
