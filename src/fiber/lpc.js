import PubSub from 'pubsub-js';

const registeredNodes = Object.create(null);

export class LpcNode {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    registeredNodes[token] = this;
  }

  unsubscribe() {
    PubSub.unsubscribe(this.token);
  }

  send(data) {
    PubSub.publish(this.id, data);
  }
}

const createErrorWrapper = fn => (...args) => {
  try {
    return fn.apply(null, args);
  } catch (err) {
    return err;
  }
};

/**
 * Publishes a message to the given channel ID
 *
 * @param {string} id
 * @param {*} data
 * @param {(id: string, args: any) => void} callback
 */
export function send(id, data, callback = null) {
  console.log(id, data);
  if (callback && typeof callback === 'function') {
    listen.once(id, (id, data) => {
      callback(id, data);
    });
  }
  PubSub.publish(id, data);
}

/**
 * Returns a listener for handling messages on said channel
 *
 * @param {string} id
 * @param {(id: string, args: any) => void} handler
 *
 * @returns {LpcNode} A node that represents easy access to the listener
 */
export function listen(id, handler) {
  const token = PubSub.subscribe(id, createErrorWrapper(handler));
  return new LpcNode(id, token);
}

/**
 * Listeners for a message on the given channel once then
 * unsubscribes itself
 *
 * @param {string} id
 * @param {(id: string, args: any) => void} handler
 */
listen.once = (id, handler) => {
  const node = listen(id, (id, args) => {
    const wrapped = createErrorWrapper(handler);
    wrapped(id, args);
    node.unsubscribe();
  });
  return node;
};
