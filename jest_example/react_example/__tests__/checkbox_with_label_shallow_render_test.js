import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../checkbox_with_label';

const shallowRenderer = TestUtils.createRenderer();

describe('CheckboxWithLabel', () => {

  shallowRenderer.render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  let checkbox = shallowRenderer.getRenderOutput();
  const component = shallowRenderer.getMountedInstance();

  it('defaults to unchecker and Off label', () => {
    const expectedChildren = [
      <input type="checkbox" checked={false} onChange={component.onChange} />,
      "Off"
    ];
    expect(checkbox.props.children).toEqual(expectedChildren);
  });

  it('changes the label after click', () => {
    component.onChange();
    checkbox = shallowRenderer.getRenderOutput();
    expect(checkbox.props.children[1]).toEqual('On');

    component.onChange();
    checkbox = shallowRenderer.getRenderOutput();
    expect(checkbox.props.children[1]).toEqual('Off');
  });

});
