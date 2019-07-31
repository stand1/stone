import React, { Component } from 'react';
import logo from "./logo.svg";
import imgUrl from "./img/ceshi.jpg";
import Child from "./child";

class About extends Component{
    state = {
        msg: 'Hello world',
        num: 0
    }
    componentDidMount(){
        this.getData()
    }
    render () {
        return (
            <div className="App">
                <div className="App-mian">
                    <p><a href="App">{this.state.msg}</a></p>
                    <Child name="Hello world"></Child>
                    <p>{this.state.num}</p>
                    <button onClick={this.add}>增加</button>
                    <button onClick={this.minus}>减少</button>
                </div>
                <footer className='App-footer'>
                    <div>这是about</div>
                </footer>
            </div>
        );
    }
    add = () => {
        this.setState(prevState => ({ num: ++prevState.num }));
    }
    minus = () => {
        this.setState(prevState => ({ num: --prevState.num }));
    }
    getData = () => {
        this.setState({msg: '你好，世界！' })
    }
}

export default About;
