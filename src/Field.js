import React from 'react';
import Food from './Food.js';
import Snake from './Snake.js';
import Cell from './Cell.js';


const height = window.screen.height;

const N = 32
const speed = 2;
const dh = height / N;


class Field extends React.Component {
  constructor(props) {
    super(props);

    this.rows = N;
    this.cols = N;

    this.snake = new Snake(this);

    let colors = [];
    for(let row=0; row<N; row++) {
      let a = []
      for(let col=0; col<N; col++) {
        a.push(false);
      } 
      colors.push(a);
    }

    this.state = {
      colors: colors,
      food: new Food(this.rows, this.cols),
      lastCommand: "ArrowDown"
    };

    this.init = this.init.bind(this);
    this.update = this.update.bind(this); 
    this.onKeyPressHandle = this.onKeyPressHandle.bind(this); 
    this.componentDidMount = this.componentDidMount.bind(this);
    this.move = this.move.bind(this); 

  }

  init() {
    let colors = this.state.colors;
    let food = this.state.food;

    for(let i=0 ; i<this.snake.nodes.length; i++) {
      let {row, col} = this.snake.nodes[i];
      colors[row][col] = true;
    }

    this.setState({
      colors: colors,
      food: food
    });

  }

  move() {
    this.update(this.state.lastCommand);
  }

  componentDidMount() {
    this.init();

    document.getElementById("table").focus();

    this.intervalId = setInterval(this.move.bind(this), 1000/speed);
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  clear() {

    let colors = this.state.colors;

    for(let i=0 ; i<this.snake.nodes.length; i++) {
      let {row, col} = this.snake.nodes[i];
      colors[row][col] = false;
    }
  }

  draw() {

    let colors = this.state.colors;

    for(let i=0 ; i<this.snake.nodes.length; i++) {
      let {row, col} = this.snake.nodes[i];
      colors[row][col] = true;
    }
  }

  update(command) {

    this.clear();

    let eat = this.snake.move(command, this.state.food);

    if (this.snake.collision) {
      alert("Collision!!!");
      clearInterval(this.intervalId);
      window.location.reload();
      return;
    }

    this.draw();

    this.setState({
      food: eat?  new Food(this.rows, this.cols) : this.state.food,
      lastCommand: command
    }, () => {
      console.log("Food", this.state.food)
    });
  }

  onKeyPressHandle(e) {
    
    this.update(e.key);

  }

  render() {
    return (
      <table id="table" tabIndex="0" onKeyDown={this.onKeyPressHandle}>
        <tbody>
          {
            [...Array(N).keys()].map((row) => {

              return (<tr>{

                [...Array(N).keys()].map((col) => {
                  return (<Cell 
                    row={row} col={col} h={dh} 
                    rowFood={this.state.food.row}
                    colFood={this.state.food.col} 
                    color={this.state.colors[row][col]? "red" : ""}/>);
                })

              }</tr>);
            }) 
          }
        </tbody>
      </table>
    );
  }
}


export default Field;