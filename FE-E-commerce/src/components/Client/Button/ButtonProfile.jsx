import React from 'react';
import { Button } from 'antd';
import './ButtonProfile.scss';

export default function SaveButton({ onClick, style, children }) {
  return (
    <Button className="save-button" onClick={onClick} style={style}>
      {children}
    </Button>
  );
}
