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
  bazzy: string;
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

const hocOfClass = renderPropToHoc(RpClassComponent, bar => ({ bar }));
const hocOfSfc = renderPropToHoc(RpSfcComponent, bar => ({ bar }));
const WrappedClass = hocOfClass({ foo: 'test' })(BasicClassComponent);
const WrappedSfc = hocOfSfc({ foo: 'test' })(BasicSfc);

describe('test', () => {
  it('works', () => {
    expect(React.isValidElement(<WrappedClass bazzy="test" />)).toBe(true);
    expect(React.isValidElement(<WrappedSfc bazzy="test" />)).toBe(true);
  });
});
