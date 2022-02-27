import React from 'react';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

class Square extends React.Component {

    constructor() {
        super();
        this.state = {
            output: '',
            blocked: false
        }
    }

    clickBoard = () => {

        if (!this.state.blocked) {
            this.props.boardClick();

            //Also, set the new item on the board...
            this.setState({
                output: this.props.setItem,
                blocked: true
            }, () => this.props.setInput(this.props.setItem))

        }

    }

    render() {
        return (
            <div
                onClick={this.clickBoard}
                className="square"
                style={squareStyle}>
                {this.state.output}
            </div>
        );
    }
}

class Board extends React.Component {

    constructor() {
        super();
        this.state = {
            //variables for each board...
            item11: 'X',
            item12: '',
            item13: '',
            item21: '',
            item22: '',
            item23: '',
            item31: '',
            item32: '',
            item33: '',
            playStatus: true,
            playItem: "X",
            gameplay: 'in-session',
            winner: 'None'
        }
    }

    resetGame = () => {
        //Reset all the items to the default values....
        this.setState({
            item11: 'X',
            item12: '',
            item13: '',
            item21: '',
            item22: '',
            item23: '',
            item31: '',
            item32: '',
            item33: '',
            playStatus: true,
            playItem: "X",
            gameplay: 'in-session',
            winner: 'None'
        })

    }

    boardClick = () => {
        //This toggles the clicked variable and sets it on the board...
        const formerState = this.state.playStatus;

        //Toggle X and O...
        if (this.state.playStatus) {
            this.setState({
                playItem: "X",
                playStatus: !formerState
            })
        } else {
            this.setState({
                playItem: "O",
                playStatus: !formerState
            })
        }

        this.checkGamePlay(this.state.playItem);

    }

    checkGamePlay = (input) => {
        //Check the X's or O's
        if ((this.state.item11 === input && this.state.item12 === input && this.state.item13 === input) || //horizontals
            (this.state.item21 === input && this.state.item22 === input && this.state.item23 === input) ||
            (this.state.item31 === input && this.state.item32 === input && this.state.item33 === input) ||
            (this.state.item11 === input && this.state.item21 === input && this.state.item31 === input) ||  //verticals
            (this.state.item12 === input && this.state.item22 === input && this.state.item32 === input) ||
            (this.state.item13 === input && this.state.item23 === input && this.state.item33 === input) ||
            (this.state.item11 === input && this.state.item22 === input && this.state.item33 === input) || //diagonals
            (this.state.item13 === input && this.state.item22 === input && this.state.item31 === input)) {
            //Match on horizontals...
            this.setState({
                winner: input
            })

        }

        console.log(this.state.item11 + " " + this.state.item12 + " " + this.state.item13)

    }

    render() {
        return (
            <div style={containerStyle} className="gameBoard">
                <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{this.state.playItem}</span></div>
                <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{this.state.winner}</span></div>
                <button style={buttonStyle} onClick={this.resetGame}>Reset</button>
                <div style={boardStyle}>
                    <div className="board-row" style={rowStyle}>
                        <Square setInput={val => this.setState({ item11: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item12: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item13: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square setInput={val => this.setState({ item21: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item22: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item23: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square setInput={val => this.setState({ item31: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item32: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                        <Square setInput={val => this.setState({ item33: val })} boardClick={this.boardClick} setItem={this.state.playItem} />
                    </div>
                </div>
            </div>
        );
    }
}

export class Test extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}
