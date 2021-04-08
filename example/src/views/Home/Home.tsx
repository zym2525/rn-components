import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SmartRefreshLayout, Text, Modal, Toast, Touchable } from '@zero-d/rn-components'
import type { NavigationStackScreenProps } from 'react-navigation-stack'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export interface HomeProps extends NavigationStackScreenProps {
}

export interface HomeState {
}

const List = [
    {
        router: 'RefreshLayoutIndex',
        name: 'go to RefreshLayoutIndex'
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

    click() {
        console.log(1111);
        Modal.alert('Title', 'alert content', [
            {
                text: 'Cancel',
                onPress: () => console.log('cancel'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('ok') },
        ]);
    }

    public render() {
        let { navigation } = this.props;
        console.log('styles', styles);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <FlatList
                    refreshControl={<SmartRefreshLayout
                        HeaderComponent={() => <SmartRefreshLayout.BezierRadarHeader />}
                    // enablePureScrollMode
                    />}
                    data={List}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <Text style={styles.listItem} onPress={() => navigation.navigate(item.router)}>{item.name}</Text>
                    }
                />
                <Text onPress={this.click.bind(this)} style={{ fontSize: 30 }}>点我</Text>
                <Touchable onPress={() => console.log('rrrrr')}>
                    <View><Text style={{ fontSize: 30 }}>hahahahaha</Text></View>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        fontSize: 28,
        textAlign: 'center'
    }
})


export default Home
