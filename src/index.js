import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom';
import './style.css'
function Square(props){
    
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
    
}

class Board extends PureComponent{
    state={
        squares:Array(9).fill(null),
        xisNext : true,
    }

    handleClick(i){
        const square = this.state.squares.slice();
        if (calculateWinner(square) || square[i]) {
            return;
        }
        square[i] = this.state.xisNext? 'X':'O';
        this.setState({
            squares:square,
            xisNext:!this.state.xisNext,
        });
    }
    renderSquare(i){
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={()=>this.handleClick(i)}
            />
        );
    }

    render(){
        const winner = calculateWinner(this.state.squares);
        let status;

        if(winner){
            status = 'Winner :' +winner;
        }else{
            status = 'Next player : '+(this.state.xisNext?'X':'O');
        }

        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends PureComponent{
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{"status"}</div>
                    <ol>{"todo"}</ol>
                </div>
            </div>
        )
    }
}

// helper function
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
    return null;
}
ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)

export default Game