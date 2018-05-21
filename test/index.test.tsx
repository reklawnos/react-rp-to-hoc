import * as React from 'react';
import renderPropToHoc from '../src/';

interface RenderPropProps {
  foo: string;
  children: (param: string) => React.ReactNode;
}

class RpClassComponent extends React.Component<RenderPropProps> {
  render() {
    const { foo, children } = this.props;
    return (
      <div>
        {children(foo)}
      </div>
    );
  }
}

const RpSfcComponent: React.SFC<RenderPropProps> = ({ foo, children }) => (
  <div>
    {children(foo)}
  </div>
);

interface BasicProps {
  bar: string;
}

class BasicClassComponent extends React.Component<BasicProps> {
  render() {
    const { bar } = this.props;
    return (
      <div>
        {bar}
      </div>
    );
  }
}

const BasicSfc: React.SFC<BasicProps> = ({ bar }) => (
  <div>
    {bar}
  </div>
);

const hocOfClass = renderPropToHoc(RpClassComponent);
const hocOfSfc = renderPropToHoc(RpSfcComponent);
const WrappedClass = hocOfClass({ foo: 'test' }, bar => ({ bar }))(BasicClassComponent);
const WrappedSfc = hocOfClass({ foo: 'test' }, bar => ({ bar }))(BasicSfc);
