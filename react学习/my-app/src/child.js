import React, { Component } from 'react';

class Child extends Component {
    render() {
        return <h1>{this.props.name}</h1>;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props === nextProps) {
            return false;
        } else {
            return true;
        }
    }
}

export default Child;
