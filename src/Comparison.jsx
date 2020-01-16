import React from 'react';
import { Chart } from "react-google-charts";

import { Heading } from "./CountryMap";
import { DATA, NAMES } from "./dummyData"

const CityName = (props) => {
    let ids = JSON.parse(props.match.params.id)
    let cities = ""
    if (ids) cities = NAMES.filter((x, index) => ids.includes(index))



    var data = [cities];
    data[0].unshift("Градове")
    for (const year in DATA) {
        let values = DATA[year].filter((x, index) => ids.includes(index))
        values.unshift(year)
        data.push(values)
    }
    cities = NAMES.filter((x, index) => ids.includes(index))
    console.log(data)


    return (
        <div>
            <Heading>Пострадали хора в { cities.join(", ")}</Heading>
            <Chart
                chartType="ColumnChart"
                data={data}
                width={"100%"}
                height={"400px"}
                legendToggle
            />
        </div>

    )
}

export default CityName