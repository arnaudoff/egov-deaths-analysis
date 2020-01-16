import React, { Component } from 'react';
import styled from 'styled-components'
import { Chart } from "react-google-charts";

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

const Heading = styled.div`
    font-size: 40px;
    font-weight: 400;
    padding: 50px;
    text-align: center;
`

export default CityName