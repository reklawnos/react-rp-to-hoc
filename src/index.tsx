import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

export interface PropsWithRenderPropChildren {
  children: (param: any) => JSX.Element;
}

type ParamOf<F extends (p: any) => any> =
  // TODO: Looks like tslint doesn't support this syntax yet...
  // tslint:disable-next-line
  F extends (param: infer T) => any ? T : never;

type ParamOfChildren<P extends PropsWithRenderPropChildren> = ParamOf<P['children']>;

export default function renderPropToHoc<Pc extends PropsWithRenderPropChildren>(
  ComponentToConvert: React.ComponentType<Pc>,
) {
  type ParamType = ParamOfChildren<Pc>;
  return function hocCreator<Pw, Passed extends Partial<Pw>>(
    convertedComponentProps: Omit<Pc, 'children'>,
    mapParamToProps: (param: ParamType) => Passed,
  ) {
    return function hoc(ComponentToWrap: React.ComponentType<Pw>) {
      const GeneratedComponent: React.SFC<Omit<Pw, keyof Passed>> = (props) => (
        <ComponentToConvert {...convertedComponentProps}>
          {param => (
              <ComponentToWrap
                {...props}
                {...mapParamToProps(param)}
              />
          )}
        </ComponentToConvert>
      );

      // TODO: do more HOC-ish best practices here, like copying over propTypes, etc.
      return hoistNonReactStatics(GeneratedComponent, ComponentToWrap as any);
    };
  };
}
