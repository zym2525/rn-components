import * as React from 'react';
import Portal from '../Portal';

export interface ProviderProps {

}

export default class Provider extends React.Component<ProviderProps> {
    render() {
        return (
            <Portal.Host>{this.props.children}</Portal.Host>
        );
    }
}