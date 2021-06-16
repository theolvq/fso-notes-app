import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // fire event on button
  const mockHandler = jest.fn();
  const component = render(<Note note={note} toggleImportance={mockHandler} />);
  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  // const li = component.container.querySelector('li');

  //  renders the selected component to the console
  // console.log(prettyDOM(li));

  // renders the desired component to the console for debugging
  // component.debug();

  // method 1
  // expect(component.container).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // );

  // method 2
  // const element = component.getByText(
  //   'Component testing is done with react-testing-library'
  // );
  // expect(element).toBeDefined();

  // method 3
  // const div = component.container.querySelector('.note');
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // );
});
