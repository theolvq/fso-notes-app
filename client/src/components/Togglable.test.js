import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    );
  });
  test('should render its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });
  test('should not render children on first render', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
  test('should render children after button click', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
  test('should allow content to be closed/hidden', () => {
    const showButton = component.getByText('show...');
    fireEvent.click(showButton);

    const hideButton = component.getByText('Cancel');
    fireEvent.click(hideButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
