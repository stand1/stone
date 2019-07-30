import React, { Component } from 'react';
import logo from './logo.svg';
import imgUrl from  './img/ceshi.jpg'
import './App.css';
import Child from './child'

class App extends Component{
  state = {
    msg: 'Hello world',
    num: 0
  }
  componentDidMount(){
    this.setState({msg: '你好，世界！'})
  }
  render () {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <div className="App-mian">
            <img src={imgUrl} alt="测试"/>
            <p>{this.state.msg}</p>
            <Child name="你好，世界"></Child>
            <p>{this.state.num}</p>
            <button onClick={this.add}>增加</button>
            <button onClick={this.minus}>减少</button>
          </div>
          <footer className='App-footer'>
            <div>这是Footer</div>
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
}

// let App = () => {
//   return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//         </header>
//         <div className="App-mian">
//           <img src={imgUrl} alt="测试"/>
//           <p>Hello world</p>
//         </div>
//         <footer className='App-footer'>
//           <div>footer</div>
//         </footer>
//       </div>
//   );
// }


export default App;
