# `rp-to-hoc`
A utility for converting render prop-based components to HOCs. Supports TypeScript ≥2.8

## Usage

```jsx
import renderPropToHoc from 'rp-to-hoc';

// Component with a `children` render prop.
// Note that `children` only takes one parameter.
const FooRenderPropComponent = ({ foo, children }) => (
  <div>
    {children(foo)}
  </div>
);

// Create the HOC
const withBar = renderPropToHoc(
  FooRenderPropComponent,

  // Function that takes the param the render prop
  // component passes to `children` and returns props that will be passed
  // to the wrapped component
  bar => ({ bar }),
);


const BarUserComponent = ({ bar }) => (
  <div>
    {bar}
  </div>
);

// Use the HOC to wrap components
const WrappedBarUserComponent = withBar(
  // These props are passed to the converted
  // render prop component. Note that these are "static" relative to this
  // call of `withBar`.
  { foo: 'test' },
)(BarUserComponent);
```
