import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface HomeProps {
}

export interface HomeState {
}

const List = [
    {
        router: 'RefreshList',
        name: 'go to RefreshList'
    },
    {
        router: 'StickyItem',
        name: 'go to StickyItem'
    },
    {
        router: 'BottomSheetIndex',
        name: 'go to BottomSheet'
    }
]

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <View>
                <Text>Home Component</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
})


export default Home
