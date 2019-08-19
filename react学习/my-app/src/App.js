import React, { Component } from 'react';
import logo from './logo.svg';
import imgUrl from  './img/ceshi.jpg'
import './App.css';
import Child from './child'
// eslint-disable-next-line
import { BrowserRouter as Router} from "react-router-dom";
// import router from './Router'

class App extends Component{
  state = {
    msg: 'Hello world',
    num: 0
  }
  componentDidMount(){
    this.getData()
  }
  render () {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className="App-mian">
                    <img src={imgUrl} alt="测试"/>
                    <p>{this.state.msg}</p>
                    <Child name="Hello world"></Child>
                    <p>{this.state.num}</p>
                    <button onClick={this.add}>增加</button>
                    <button onClick={this.minus}>减少</button>
                </div>
                <footer className='App-footer'>
                    <div>
                        <p>footer</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
  }
  add = () => {
    this.setState(prevState => ({ num: ++prevState.num }));
  }
  minus = () => {
    this.setState(prevState => ({ num: --prevState.num }));
  }
  getData = () => {
    this.setState({msg: '你好，世界！' });
  }
}

export default App;
