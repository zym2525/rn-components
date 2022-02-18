import * as React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { SmartRefreshLayout, Text, Modal, Touchable } from '@zero-d/rn-components'
import type { StackScreenProps } from '@react-navigation/stack'
// import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import Test, { Test as OTest, TestProps } from '../RefreshList/Test'

export interface HomeProps extends StackScreenProps<RootStackParamList, 'Home'> {
}

export interface HomeState {
}

const List = [
    {
        router: 'RefreshLayoutIndex' as keyof RootStackParamList,
        name: 'go to RefreshLayoutIndex'
    },
    {
        router: 'StickyItem' as keyof RootStackParamList,
        name: 'go to StickyItem'
    },
    // {
    //     router: 'BottomSheetIndex' as keyof RootStackParamList,
    //     name: 'go to BottomSheet'
    // }
    {
        router: 'Draggable' as keyof RootStackParamList,
        name: 'go to Draggable'
    },
    {
        router: 'WaterfallGrid' as keyof RootStackParamList,
        name: 'go to WaterfallGrid'
    },
]

class Home extends React.Component<HomeProps, HomeState> {
    testRef = React.createRef<OTest>()
    constructor(props: HomeProps) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // AliyunOSS.addEventListener('downloadProgress',function(e){
        //     e.currentSize
        // })
        this.testRef.current!.show()
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
                <Test ref={this.testRef} He='333' />
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
                <Touchable onPress={() => console.log('rrrrr')} TouchableComponent={TouchableNativeFeedback} >
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
