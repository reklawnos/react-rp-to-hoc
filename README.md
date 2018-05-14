# `rp-to-hoc`
A utility for converting render prop-based components to HOCs. Supports TypeScript ≥2.8

## Usage

```jsx
import renderPropToHoc from 'rp-to-hoc';

// Component with a `children` render prop.
// Note that `children` only takes one parameter.
const FooBarRenderPropComponent = ({ foo, children }) => (
  <div>
    {children(foo)}
  </div>
);

// Create the HOC
const withFooBar = renderPropToHoc(FooBarRenderPropCoomponent);


const BazComponent = ({ someProp }) => (
  <div>
    {someProp}
  </div>
);

// Use the HOC to wrap components
const WrappedBazComponent = withFooBar(
  // convertedComponentProps: these props are passed to the converted
  // render prop component. Note that these are "static" relative to the
  // creation of the HOC.
  { foo: 'test' },

  // mapParamToProps: function that takes the param the render prop
  // component passes to `children` and returns props that will be passed
  // to the wrapped component
  bar => ({ bar }),
)(BazComponnt);
```
