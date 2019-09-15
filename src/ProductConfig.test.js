import React from 'react';
import ReactDOM from 'react-dom';
import Customizer from './Customizer';
import { mount } from "enzyme";
import ProductConfig from "./ProductConfig";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Customizer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test ProductConfig.Color to make sure the correct color exists after change 

describe("the Color component", () => {
  let wrapper = null;
  let radios = null;

  const handleColor = jest.fn();

  it ("renders a <Color /> without crashing", () => {
    wrapper = mount(
      <ProductConfig>
        {(colorOptions, { colorChoice }, handleColor) => (
          <ProductConfig.Color 
          colorOptions={colorOptions}
          colorChoice={colorChoice}
          handleColor={handleColor}
          />
        )}
      </ProductConfig>
    )
  })

  it("renders radio buttons", () => {
    radios = wrapper.find("input[type='radio']");
    expect(radios.length).toBeTruthy();
  });

  it("selects a color", () => {
    radios.last().simulate("change");
    expect(handleColor).toHaveBeenCalled();
  });
});