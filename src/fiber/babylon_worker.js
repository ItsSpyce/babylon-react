import Babylon from 'babylonjs';
import { send, listen } from './lpc';
import messages from './messages';

// this file will export nothing at the moment

let renderFnQueue = [];
let engine;
let activeScene;

/**
 * Queues a function to be executed on the render thread
 *
 * @param {(id: string, args: any) => void} fn
 */
const addToRenderQueue = fn => (id, args) =>
  renderFnQueue.push(() => fn(id, args));
const popFromRenderQueue = count => {
  const result = [];
  let i = 0;
  while (i < count) {
    if (renderFnQueue.length === 0) return result;
    result.push(renderFnQueue.shift());
    i++;
  }
  return result;
};

const w = fn => (...args) => {
  try {
    return fn.call(null, ...args);
  } catch (err) {
    console.error(err);
  }
};

function createEngine(_, props) {
  if (engine) return;
  const { canvas, connectToGraphicsDevice, options } = props;
  engine = new Babylon.Engine(canvas, true, options, true);
  return engine;
}

listen(messages.CREATE_ENGINE, w(createEngine));

function runEngine() {
  if (!engine) {
    console.error('Engine not initialized');
    return;
  }
  engine.runRenderLoop(() => {
    // execute render loop queue
    const fns = popFromRenderQueue(5);
    fns.forEach(fn => fn());
    activeScene.render();
  });
}

listen(messages.RUN_ENGINE, w(runEngine));

function createScene(props) {
  console.log('Creating scene');
  if (!engine) {
    throw new Error('Cannot create scene without registered engine!');
  }
  activeScene = new Babylon.Scene(engine);
  send(messages.CREATE_SCENE, activeScene.uid);
}

listen(messages.CREATE_SCENE, w(createScene));
