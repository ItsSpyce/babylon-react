import { useLpc } from '../lpc';
import { CREATE_ENGINE } from '../messages';

const Engine = ({
  canvas,
  connectToGraphicsDevice = true,
  options,
  children
}) => {
  const lpc = useLpc();
  if (canvas) {
    lpc.send(CREATE_ENGINE, {
      canvas,
      connectToGraphicsDevice,
      options
    });
  }

  return children;
};

export default Engine;
