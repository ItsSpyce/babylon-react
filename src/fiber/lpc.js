import { useState } from 'react';
import PubSub from 'pubsub-js';
import { uuidv4 } from './utils';

const registeredNodes = Object.create(null);

const lpcChannel = (lpcNode, channel) => `${lpcNode.id}|${channel}`;

export class LpcNode {
  constructor(id = uuidv4()) {
    this.id = id;
    // don't want external sources to access this as easy
    this.__cancelTokens = Object.create(null);
    registeredNodes[this.id] = this;
  }

  send(channel, message, callback = null) {
    console.log('sending', this, channel, message);
    if (callback && typeof callback === 'function') {
      this.once(lpcChannel(this, channel), createErrorWrapper(callback));
    }
    PubSub.publish(lpcChannel(this, channel), message);
  }

  listen(channel, handler) {
    console.log('listening', this, channel);
    const cancelToken = PubSub.subscribe(
      lpcChannel(this, channel),
      createErrorWrapper(handler)
    );
    this.__cancelTokens[channel] = cancelToken;
    return this;
  }

  /**
   *
   * @param {string} channel
   * @param {(channel: string, message: any)} handler
   */
  once(channel, handler) {
    const cancelToken = PubSub.subscribe(
      lpcChannel(this, channel),
      createErrorWrapper((channel, message) => {
        handler(channel, message);
        PubSub.unsubscribe(cancelToken);
      })
    );

    return this;
  }

  unsubscribe(channel) {
    if (!this.__cancelTokens[channel]) {
      return;
    }

    PubSub.unsubscribe(this.__cancelTokens[channel]);
    delete this.__cancelTokens[channel];
    return this;
  }

  static fromChannel(channel) {
    const channelParts = channel.split('|');
    if (channelParts.length <= 1) {
      throw new Error(`Channel does not have node ID: ${channel}`);
    }
    const nodeId = channelParts[0];
    return registeredNodes[nodeId];
  }
}

export const useLpc = () => {
  const [node] = useState(new LpcNode());
  return node;
};

/**
 *
 * @param {(channel: string, message: any) => void} fn
 */
const createErrorWrapper = fn => (...args) => {
  try {
    return fn.apply(null, args);
  } catch (err) {
    return err;
  }
};
