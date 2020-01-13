import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PointerEvents } from '../types';
import '../babylon_worker';

const Canvas = ({ children, className, width, height, ...events }) => {
  const [ref, setRef] = useState(null);
  return (
    <canvas
      ref={setRef}
      id="babylon_canvas"
      className={className}
      style={{ width, height }}
      touch-action="none"
      {...events}
    >
      {children(ref)}
    </canvas>
  );
};

Canvas.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  ...PointerEvents
};

Canvas.defaultProps = {
  children() {},
  className: null,
  width: '100%',
  height: '100%'
};

export default Canvas;
