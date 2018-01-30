import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import App from './App';
import * as main from './main';

test('Renders the application', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('State changes when an option is selected', () => {
  const component = shallow(<App />);

  const event = {target: {value: 'uuidv4'}};
  component.find('#replaceOption').simulate('change', event);

  expect(component.state().option).toEqual('uuidv4');
});

test('State changes when a pattern is selected', () => {
  const component = shallow(<App />);

  const event = {target: {value: 'custom'}};
  component.find('#pattern').simulate('change', event);

  expect(component.state().pattern).toEqual('custom');
  expect(component.find('#customPattern').length).toEqual(1);
});

test('Show message error when custom pattern field is empty', () => {
  const component = mount(<App />);

  const event = {target: {value: 'custom'}};
  component.find('#pattern').simulate('change', event);
  component.find('#replaceButton').simulate('click');

  expect(component.state().patternError).toEqual('Pattern is mandatory');
  expect(component.find('.alert').text()).toEqual('Pattern is mandatory');
});

test('Show message error when custom pattern field is empty', () => {
  const component = mount(<App />);

  const event = {target: {value: 'custom'}};
  component.find('#replaceOption').simulate('change', event);
  component.find('#replaceButton').simulate('click');

  expect(component.state().replacementError).toEqual(
    'Replacement text is mandatory',
  );
  expect(component.find('.alert').text()).toEqual(
    'Replacement text is mandatory',
  );
});

test('Shows content replaced', () => {
  const component = mount(<App />);
  main.default = jest.fn().mockReturnValue('Replaced content');

  component.find('#replaceButton').simulate('click');

  expect(component.instance().outputText.value).toEqual('Replaced content');
});
