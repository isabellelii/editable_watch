import React from 'react';
import ReactDOM from 'react-dom';
import Customizer from './Customizer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Customizer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
