import React, {Component} from 'react';
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import {Route} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import HomePage from "./pages/HomePage";
import 'semantic-ui-css/semantic.min.css';
import NewContact from "./pages/NewContact";
class App extends Component {



    render() {
        return (
            <div className="App">
                <Header/>
                <Container text>
                <Route  path='/' exact component={HomePage}/>
                <Route path='/contact' exact component={NewContact}/>
                <Route path='/contact/:id' exact component={NewContact}/>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default App;
