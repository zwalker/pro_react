import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../checkbox_with_label';

const shallowRenderer = TestUtils.createRenderer();

describe('CheckboxWithLabel', () => {

  shallowRenderer.render(<CheckboxWithLabel lanelOn="On" labelOff="Off" />);
  const checkbox = shallowRenderer.getRenderOutput();

  it('defaults to unchecker and Off label', () => {
    const inputField = checkbox.props.children[0];
    const textNode = checkbox.props.children[1];
    expect(inputField.props.checked).toEqual(false);
    expect(textNode).toEqual('Off');
  });


});
