import React from 'react';


export default class Cell extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            background: "",
            row: props.row,
            col: props.col,
            h: props.h
        }

        this.changeBackColor = this.changeBackColor.bind(this);
    }

    changeBackColor() {
        this.setState((prevState) => {
            prevState.background = "red";
        });
    }

    render() {
        return (
            <td> 
                <div id={this.state.row + "," + this.state.col} 
                style={
                    {
                        height: this.state.h, 
                        backgroundColor: (this.props.row === this.props.rowFood && this.props.col === this.props.colFood)? "green" : this.props.color,
                        // border: '1px solid black'
                    }
                }></div>
            </td>
        );
    }
}