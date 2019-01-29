import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "EmreKARa"
        };

    }

    componentWillMount() {
        console.log("componentWillMount");
        setTimeout(() => {
            this.setState({name: "Emre"})
        }, 2000)
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillReceiveProps(nextProps, nextContext) {
        
    }

    render() {
        console.log("Render");
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {this.state.name}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn Reacts
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
