import React from 'react';

type SocialSVGType = {
  color?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

export const LeftArrow = ({ color, width, height, onClick }: SocialSVGType) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={width || '20.024'}
    height={height || '38.566'}
    viewBox="0 0 36.024 64.566"
  >
    <path
      id="Icon_material-keyboard-arrow-left"
      data-name="Icon material-keyboard-arrow-left"
      d="M46.927,68.811,19.453,40.533,33.692,26.44,48.024,12.255,44.284,8.25,12,40.533,44.284,72.816Z"
      transform="translate(-12 -8.25)"
      fill={color || '#968068'}
    />
  </svg>
);
