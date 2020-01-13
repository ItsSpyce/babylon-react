import PropTypes from 'prop-types';
import Babylon from 'babylonjs';

export const PointerEvents = {
  onClick: PropTypes.func,
  onWheel: PropTypes.func,
  onPointerDown: PropTypes.func,
  onPointerUp: PropTypes.func,
  onPointerLeave: PropTypes.func,
  onPointerMove: PropTypes.func,
  onGotPointerCapture: PropTypes.func,
  onLostPointerCapture: PropTypes.func
};

export const Vector2Props = {
  x: PropTypes.number,
  y: PropTypes.number
};

export const Vector3Props = {
  ...Vector2Props,
  z: PropTypes.number
};

export const Vector4Props = {
  ...Vector3Props,
  w: PropTypes.number
};

export const Color3Props = {
  r: PropTypes.number,
  g: PropTypes.number,
  b: PropTypes.number
};

export const Color3 = ({ r, g, b }) => new Babylon.Color3(r, g, b);

export const Color4Props = {
  ...Color3Props,
  a: PropTypes.number
};

export const Color4 = ({ r, g, b, a }) => new Babylon.Color4(r, g, b, a);
