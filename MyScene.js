import React, { Component } from 'react';
import { View, Text, Navigator, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }
  _navigate(){
  this.props.navigator.push({
    name: 'chat'
  })
}

  render() {
    return (
      <TouchableHighlight onPress={ () => this._navigate() } >
          <Text>Fal Bak!</Text>
      </TouchableHighlight>
    )
  }
}
