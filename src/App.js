import React, {Component} from 'react';
import TextField from './TextField'
import Model from './Model'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0,
            xs: [],
            ys: [],
            xPred: 0,
            yPred: 0
        }
    }

    sendErrorCode(message) {
        console.log(message)
        throw message
    }

    handleClick() {
        const {x, y, xs, ys} = this.state
        try {
            if (isNaN(parseInt(x))) this.sendErrorCode('not a number!')
            if (isNaN(parseInt(y))) this.sendErrorCode('not a number!')
            this.setState({
                xs: [...xs, parseInt(x)],
                ys: [...ys, parseInt(y)],
                x: 0,
                y: 0
            })
        } catch (err) {
            console.log('failed to add a train set')
            this.sendErrorCode(err)
        }
    }

    renderTestMenu() {
        const {xs, ys, xPred, yPred} = this.state
        // Create the model first
        const model = new Model()
        model.trainModel(this.state.xs, this.state.ys)
        return (
            <div>
                <h1>Add the value of X to predict Y</h1>
                X value to predict:<TextField value={xPred} onChange={(event) => this.setState({xPred: event.target.value})}/>
                <input type='submit' name='predict' onClick={() => {
                    const predicted = model.predict(parseInt(xPred))
                    this.setState({yPred: predicted})
                }}/>
                <h1>Value of Y predicted: {yPred}</h1>
            </div>

        )
    }


    render() {
        const {x, y, xs, ys} = this.state
        return (
            <div className="App">
                <h1>Train Linear Model (Please give at least 5 samples)</h1>
                <TextField label='X:' value={x} onChange={(event) => this.setState({x: event.target.value})}/>
                <TextField label='Y:' value={y} onChange={(event) => this.setState({y: event.target.value})}/>
                <input type='submit' onClick={() => this.handleClick()}/>
                <div>
                    X:{xs.map((x, key) => (
                    <b key={key}>{key !== 0 ? ',' : null}{x}</b>
                ))}
                </div>
                <div>
                    Y:{ys.map((y, key) => {
                    return (<b key={key}>{key !== 0 ? ',' : null}{y}</b>)
                })}
                </div>
                {xs.length >= 5 ? this.renderTestMenu() : null}
            </div>
        );
    }

}

export default App;
