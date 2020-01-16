import React, { Component } from 'react';
import styled from 'styled-components'
import CityName from "./CityName"
import TableData from "./TableData"

import Country from './assets/Bulgaria.svg';
import {MAP, DATA} from "./dummyData"

class CountryMap extends Component {
    render() {
        let max = 65, min = 15;
        let step = (min+max)/3;
        
        var cities = MAP.map((x, index) => <CityName {...x} key={index} id={index} amount={DATA["2018"][index]} min={min} step={step} />)
        return (
            <div>
                <Heading>Пострадали хора в ПТП</Heading>
                <div style={{ height: "800px", paddingLeft: "200px" }}>
                    <Absolute>
                        {cities}
                        <div><img height="800px" systemLanguage="bg" src={Country} alt="Bulgaria" /></div>
                    </Absolute>
                </div>

                <Table>
                    <TableData data={DATA}/>
                </Table>
            </div>
        )
    }
}



const Table = styled.div`
    margin-top: 200px;
    text-align: left;
`
const Absolute = styled.div`
    position: absolute;
`


const Heading = styled.div`
    font-size: 40px;
    font-weight: 400;
    padding: 50px;
    text-align: center;
`
export default CountryMap 
