import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SmartRefreshLayout, SmartRefreshLayoutWithoutTheme } from '@zero-d/rn-components'
import type { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<RootStackParamList, 'RefreshList'> & {

}

type RefreshListState = {
    data: number[]
}
class RefreshList extends Component<Props, RefreshListState> {

    // static navigationOptions: NavigationStackOptions = {
    //     headerShown: false
    // };

    private refreshList = React.createRef<SmartRefreshLayoutWithoutTheme>();

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [1, 1, 1, 1,]
        };
    }

    componentDidMount() {

    }

    onRefresh() {
        console.log('onRefresh');
        setTimeout(() => {
            this.setState(preState => ({
                data: [1, 1, 1, 1]// preState.data.concat()
            }), () => {
                this.refreshList.current!.finishRefresh({ success: true })
            })
        }, 2000)
    }

    onLoadMore() {
        console.log('onLoadMore');
        setTimeout(() => {
            this.setState(preState => ({
                data: preState.data.concat([1, 1, 1, 1])
            }), () => {
                if (this.state.data.length > 7) {
                    this.refreshList.current!.finishLoadMoreWithNoMoreData()
                } else {
                    this.refreshList.current!.finishLoadMore()
                }

            })
        }, 2000)
    }

    render() {
        return (
            <SmartRefreshLayout
                style={{ flex: 1, }}
                onRefresh={this.onRefresh.bind(this)}
                onLoadMore={this.onLoadMore.bind(this)}
                enableAutoLoadMore={false}
                ref={this.refreshList}
                enableLoadMore
                primaryColor='#59b8fa'
            // HeaderComponent={() => <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.FixedBehind} />}
            // enableRefresh={false}
            >
                <FlatList
                    style={{ flex: 1, backgroundColor: '#fff' }}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <Text
                            style={{
                                height: 100,
                                borderBottomWidth: 1,
                                borderBottomColor: '#dcdcdc',
                                fontSize: 28,
                            }}
                        > RefreshList {index + 1}</Text>
                    }
                />
            </SmartRefreshLayout>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        // position: 'absolute',
        // width: Dimensions.get('window').width,
        backgroundColor: '#fe1200',
        padding: 20,
        height: 60,
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 30,
        color: '#c1c1c1',
        position: 'absolute',
        left: 20,
        top: 15
    },
    headerText: {
        fontSize: 28,
        height: 40,
    },
})

export default RefreshList;
