import React, { Component } from 'react';
import { Color3, Color4 } from 'babylonjs';
import { send } from '../lpc';
import { CREATE_SCENE, UPDATE_SCENE } from '../messages';
import { diff } from '../utils';

class Scene extends Component {
  state = {
    sceneId: null
  };

  componentDidUpdate(prevProps, prevState) {
    const sceneDiff = diff(this.props, prevProps);
    const { sceneId } = this.state;
    // send message that the scene updated
    if (!this.state.sceneId) {
      // create a scene then listen for a response
      send(CREATE_SCENE, this.props, (_, sceneId) => {
        // set the current component ID to what's passed
        console.log('yee');
        this.setState({ sceneId });
      });
    } else {
      send(UPDATE_SCENE, { sceneId, sceneDiff });
    }
  }

  render() {
    return this.props.children || null;
  }
}

export default Scene;
