import * as React from 'react';

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

export interface PropsWithRenderPropChildren {
  children: (param: any) => JSX.Element;
}

type ParamOf<F extends (p: any) => any> =
  F extends (param: infer T) => any ? T : never;

type ParamOfChildren<P extends PropsWithRenderPropChildren> = ParamOf<P['children']>;

export default function renderPropToHoc<Pc extends PropsWithRenderPropChildren>(
  ComponentToConvert: React.ComponentType<Pc>
) {
  type ParamType = ParamOfChildren<Pc>;
  return function hoc<Pw, Passed extends Partial<Pw>>(
    ComponentToWrap: React.ComponentType<Pw>,
    convertedComponentProps: Omit<Pc, 'children'>,
    paramToProps: (param: ParamType) => Passed,
  ) {
    const GeneratedComponent: React.SFC<Omit<Pw, keyof Passed>> = (props) => (
      <ComponentToConvert {...convertedComponentProps}>
        {param => (
            <ComponentToWrap
              {...props}
              {...paramToProps(param)}
            />
        )}
      </ComponentToConvert>
    );
    return GeneratedComponent;
  }
}
