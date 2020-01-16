import React from 'react';
import { Chart } from "react-google-charts";
import { Heading } from "./CountryMap";
import { DATA, NAMES } from "./dummyData"

const Detailed = (props) => {
  let id = props.match.params.id
  let data = DATA["2018"].map((elem, index) => [NAMES[index], parseFloat(elem), index == id ? "" : "#dc3911"])
  console.log(data)
  data.unshift(["Град", "брой хора", { role: "style" }])
  const options = {
    title: "Пострадали хора в ПТП за 2018",
    is3D: false
  };
  return (
    <div>
      <Heading>Пострадали хора в { NAMES[id]}</Heading>
      <Chart
        chartType="ColumnChart"
        data={data}
        width={"100%"}
        height={"400px"}
        legendToggle
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="800px"
        data={data}
        options={options}
      />
    </div>

  )

}

export default Detailed
