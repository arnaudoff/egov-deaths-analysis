import React, { Component } from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import { NAMES } from "./dummyData"


class TableData  extends Component {
    
    constructor(props){
        super(props)
        let rows = [], i = 1
        let content = [<TableCell key={0}>Градове</TableCell>];
        for (const property in this.props.data) {
            let x = <TableCell key={property}>{property}</TableCell>
            content.push(x)
        }
        rows.push(<HeadingRow key={0}>{content}</HeadingRow>)
    
        NAMES.forEach((element,index) => {
            content = [<TableCell key={index}>{element}</TableCell>];
            for (const property in this.props.data) {
                let x = <TableCell key={i}>{this.props.data[property][index]}</TableCell>
                content.push(x)
                i++
            }
            rows.push(<TableRow active={false}  key={index+1} index={index+1} content={content} handleRowClick={this.handleRowClick}/>)
        });
        rows.push(<FooterRow key={i+1} onClick={this.handleComparisonClick}>Създай Графика</FooterRow>)
        this.state = {
            rows
        }
    }

    handleRowClick = (id) => {
        let contetnt = this.state.rows[id].props.content;
        let active = this.state.rows[id].props.active;
        this.state.rows[id] = <TableRow active={!active}  key={id} index={id} content={contetnt}  handleRowClick={this.handleRowClick}/>
        this.setState({rows : this.state.rows})
    }

    handleComparisonClick =() =>{
        let active = this.state.rows.filter((x)=>x.props.active == true).map((element) => element.props.index-1);
        if(active.length>0)
            this.props.history.push('/comparison/'+JSON.stringify(active))
    }
    render(){
        
        return this.state.rows
    } 
}

const TableRow = (props) =>{
    let color = props.active? "#d7ffd9": ""
    return <Row style={{background: color}} onClick={()=>props.handleRowClick(props.index)}>{props.content}</Row>
}

const HeadingRow = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    border-bottom: 1px solid #d6d6d6;
`

const Row = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f6f6f6;
    cursor: pointer;
`
const FooterRow = styled.div`
    padding: 10px;
    margin: 5px;
    border-top: 1px solid #f6f6f6;
    color: white;
    text-align: center;
    background: #1976d2;
    cursor: pointer;
`



const TableCell = styled.div`
    width: 150px
`

export default withRouter(TableData)