import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    if (props.winnerCells.includes(props.num)) {
        return (
            <button className="square" style={{"color": "red"}} onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }

}

class Board extends React.Component {
    renderSquare(i, winnerCells) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            key={i}
            num={i}
            winnerCells={winnerCells}
        />;
    }

    render() {
        let num = 0;
        const boards = [];
        for (let k = 0; k < 3; k++) {
            const item = [];
            for (let j = k * 3; j < k * 3 + 3; j++) {
                item.push(this.renderSquare(num, this.props.winnerCells));
                num++;
            }
            boards.push(<div className="board-row" key={k}>{item}</div>);

        }
        return (
            <div>
                {boards}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            XIsNext: true,
            cells: [],
            ascendingOrder: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares)[0] || squares[i]) {
            return;
        }
        squares[i] = this.state.XIsNext ? 'X' : 'O';

        const cells = this.state.cells.slice();
        cells.push(i);

        this.setState(
            {
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                XIsNext: !this.state.XIsNext,
                cells: cells,
            }
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            XIsNext: (step % 2) === 0,
        });
    }

    switchOrder() {
        this.setState({
            ascendingOrder: !this.state.ascendingOrder,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares)[0];

        const moves = history.map((step, move) => {
            const cell = this.state.cells[move - 1];
            const desc = move ?
                'Go to move # ' + move + " is (" + Math.floor(cell / 3) + "," + cell % 3 + ")"
                :
                'Go to game start';

            if (this.state.stepNumber === move) {
                return (
                    <li key={move}>
                        <button style={{"fontWeight": "bold"}} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });

        if (!this.state.ascendingOrder) {
            moves.sort(function (a, b) {
                return b.key - a.key;
            });
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber === 9) {
            status = 'A tie with no winner!';
        } else {
            status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winnerCells={calculateWinner(current.squares)[1] ? calculateWinner(current.squares)[1] : []}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <br/>
                    <button onClick={() => this.switchOrder()}>switch order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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
            return [squares[a], lines[i]];
        }
    }
    return [null, null];
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
