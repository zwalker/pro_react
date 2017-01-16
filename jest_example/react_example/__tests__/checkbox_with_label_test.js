import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../checkbox_with_label';

describe('CheckboxWithLabel', () => {
  var checkbox = TestUtils.renderIntoDocument(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  var checkboxNode = ReactDOM.findDOMNode(checkbox);
  it('defaults to Off label', () => {
    expect(checkboxNode.textContent).toEqual('Off');
  });

  it('defaults to unckecker', () => {
    let checkboxElement = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    expect(checkboxElement.checked).toBe(false);
  });

  it('changes the label after click', () => {
    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    );
    expect(checkboxNode.textContent).toEqual('On');
  });
});
