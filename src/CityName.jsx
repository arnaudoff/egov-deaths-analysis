import React, { Component } from 'react';
import styled from 'styled-components'
import { Link, } from "react-router-dom";

const COLORS = ["#ffa000","#d05ce3"]

class CityName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }
    handleClick = (value) => {
        this.setState({ active: value })
    }
    render() {
        let i =0, min = this.props.min;
        
        while (this.props.amount> min) {
            min +=this.props.step
            i++
        }

        let pointColor = COLORS[i%2]
        return (<Link style={{ textDecoration: 'none', color: this.state.active ? "white" :  '#d6d6d6' }}
                        to={"/detailed/" + this.props.id} onMouseLeave={() => this.handleClick(false)}
        onMouseOver={() => this.handleClick(true)}>
            <Point style={{
                    top: `${parseInt(this.props.top)-30}px`, left: `${this.props.left}px`,
                    padding: this.state.active ? "10px 30px 30px 30px" : "",
                    minWidth: this.state.active ? "20px" : "",
                    background: pointColor
                ,}}>
                {this.props.amount}</Point>
            <Block  style={{top: `${this.props.top}px`, left: `${this.props.left}px`,
            fontWeight: "600",
        background: this.state.active ? pointColor : "",}}>
                
                {this.props.name}

            </Block>
            </Link>
        )
    }
}
const Block = styled.span`
    padding: 5px 10px;
    border-radius: 5px;
    position: absolute;
    cursor: pointer;
`

const Point = styled.span`
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
    color: white;
    font-weight: 900;
    background: #d05ce3;
`

export default CityName