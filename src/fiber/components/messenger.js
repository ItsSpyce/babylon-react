import React, { Component } from 'react';
import { LpcNode, listen } from '../lpc';
import PropTypes from 'prop-types';

export default class Messenger extends Component {
  static propTypes = {
    topic: PropTypes.number.isRequired,
    handler: PropTypes.func.isRequired,
    children: PropTypes.func
  };

  static defaultProps = {
    children() {}
  };

  componentDidMount() {
    const { topic, handler } = this.props;
    this.lpc = listen(topic.toString(), handler);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    snapshot.lpc.unsubscribe();
  }

  getSnapshotBeforeUpdate() {
    return { lpc: this.lpc };
  }

  /**
   * @type {LpcNode}
   *
   * @memberof Messenger
   */
  lpc = null;

  render() {
    return this.props.children(this.lpc);
  }
}
