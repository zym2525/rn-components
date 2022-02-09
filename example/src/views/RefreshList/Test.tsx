import { Text, View } from 'react-native';
import React, { Component, ComponentClass } from 'react';

export type TestProps = {
    He: string,
}

export class Test extends Component<TestProps> {

    show() {
        console.log('show');
    }

    render() {
        return (
            <View>
                <Text>1111{this.props.He}</Text>
            </View>
        );
    }
}

type ClassComponentType<T, P> = T extends React.Component<P> ? { new(props: P): T } : never;
type ExoticComponentType<T, P> = React.ExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;

function hoc<T, P>(Component: ClassComponentType<T, P> | React.FunctionComponent<P> | ExoticComponentType<T, P>) {
    return React.forwardRef<T, P>((props, ref) => <Component ref={ref} {...props} />);
}


export default hoc(Test);
