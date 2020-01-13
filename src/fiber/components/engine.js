import { send } from '../lpc';
import { CREATE_ENGINE } from '../messages';

const Engine = ({
  canvas,
  connectToGraphicsDevice = true,
  options,
  children
}) => {
  if (canvas) {
    send(CREATE_ENGINE, {
      canvas: canvas.current,
      connectToGraphicsDevice,
      options
    });
  }

  return children;
};

export default Engine;
