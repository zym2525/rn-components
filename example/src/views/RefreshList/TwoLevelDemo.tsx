import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Dimensions, StatusBar, } from 'react-native';
import { SmartRefreshLayout, TwoLevelHeader, ClassicsHeader, SmartRefreshLayoutOnHeaderMovingEvent, SmartRefreshLayoutStateChangedEvent, Text } from '@zero-d/rn-components'
import Animated, { debug, Value, clockRunning, startClock, timing, set, cond, Clock, event, sub, min, EasingNode, block, stopClock, divide, add, max } from 'react-native-reanimated'
import { px2dp } from '../../utils';
import type { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<RootStackParamList, 'TwoLevelDemo'>

type State = {
    data: number[]
}

function runTiming(clock: Animated.Clock, value: Animated.Node<number>, dest: Animated.Node<number> | number, duration: number) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: duration,
        toValue: new Value(0),
        easing: EasingNode.inOut(EasingNode.ease),
    };

    return block([
        cond(
            clockRunning(clock),
            [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
            ],
            [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]
        ),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

class TwoLevelDemo extends Component<Props, State> {

    private refreshList = React.createRef<SmartRefreshLayout>();
    private twoLevelHeader = React.createRef<TwoLevelHeader>();
    private headerPercent: Animated.Value<number>;
    private twoLevelContentOpacity: Animated.Node<number>;
    private clock = new Clock();
    private headerMoveOffset: Animated.Value<number>;
    private twoLevelContentBg: Animated.Node<number>;

    static navigationOptions = {
        headerShown: false
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [1, 1]
        };
        this.headerPercent = new Animated.Value(0);
        this.twoLevelContentOpacity = new Animated.Value(0);
        this.headerMoveOffset = new Value(0);
        let floorHeight = Dimensions.get('window').height - (StatusBar.currentHeight as number);
        console.log('floorHeight: ', floorHeight);
        this.twoLevelContentBg = debug('twoLevelContentBg', min(0, add(60 - floorHeight, this.headerMoveOffset)))
    }

    componentDidMount() {

    }

    onRefresh() {
        console.log('onRefresh');
        setTimeout(() => {
            // this.setState(preState => ({
            //     data: [1, 1, 1, 1]// preState.data.concat()
            // }), () => {
            this.refreshList.current?.finishRefresh({ success: false })
            // })
        }, 2000)
    }

    onLoadMore() {
        console.log('onLoadMore');
        setTimeout(() => {
            this.setState(preState => ({
                data: preState.data.concat([1, 1, 1, 1])
            }), () => {
                if (this.state.data.length > 7) {
                    this.refreshList.current?.finishLoadMoreWithNoMoreData()
                } else {
                    this.refreshList.current?.finishLoadMore()
                }

            })
        }, 2000)
    }

    onHeaderMoving(data: SmartRefreshLayoutOnHeaderMovingEvent) {
        // console.log('onHeaderMoving data: ', data);
        this.headerPercent.setValue(data.nativeEvent.percent)
        this.headerMoveOffset.setValue(px2dp(data.nativeEvent.offset))
    }

    onTwoLevel() {
        // console.log('onTwoLevel data: ');
        console.log('onTwoLevel');
        this.twoLevelContentOpacity = runTiming(this.clock, this.twoLevelContentOpacity, 1, 2000);
    }

    onStateChanged({ nativeEvent: { oldState } }: SmartRefreshLayoutStateChangedEvent) {
        if (oldState == SmartRefreshLayout.RefreshState.TwoLevel) {
            this.twoLevelContentOpacity = runTiming(this.clock, this.twoLevelContentOpacity, 0, 1000);
        }
    }

    render() {
        console.log(this.state.data);
        let { width: screenwidth, height: screenHeight } = Dimensions.get('screen');
        screenHeight = screenHeight - (StatusBar.currentHeight as number);
        return (
            <View style={{ flex: 1 }}>
                {/* <Animated.View style={[styles.title, { opacity: sub(1, min(this.headerPercent, 1)) }]}>
                    <Text style={styles.arrow} onPress={() => this.props.navigation.goBack()}>&#xe606;</Text>
                    <Animated.Text
                        style={[
                            styles.headerText,
                            {
                                position: 'absolute',

                            }
                        ]}
                    >this is header</Animated.Text>
                </Animated.View> */}
                <SmartRefreshLayout
                    style={{ flex: 1, }}
                    onRefresh={this.onRefresh.bind(this)}
                    onLoadMore={this.onLoadMore.bind(this)}
                    onHeaderMoving={this.onHeaderMoving.bind(this)}
                    onStateChanged={this.onStateChanged.bind(this)}
                    enableAutoLoadMore={false}
                    ref={this.refreshList}
                    enableLoadMore
                    HeaderComponent={() => <TwoLevelHeader
                        ref={this.twoLevelHeader}
                        style={{ overflow: 'hidden' }}
                        onTwoLevel={this.onTwoLevel.bind(this)}
                    >

                        {/* 必须包一层view 不然不会显示 */}
                        <View collapsable={false} style={{ width: screenwidth, height: screenHeight, }}>
                            <Animated.Image
                                //@ts-ignore
                                style={{
                                    width: screenwidth, height: screenHeight,
                                    transform: [{ translateY: this.twoLevelContentBg }]
                                }}
                                source={require('../../img/image_second_floor.jpg')}
                            />

                        </View>
                        {/* <Animated.View style={{ height: 800, opacity: this.twoLevelContentOpacity }}>
                            <Text style={styles.twoText}>我</Text>
                            <Text style={styles.twoText}>突</Text>
                            <Text style={styles.twoText}>然</Text>
                            <Text style={styles.twoText}>就</Text>
                            <Text style={styles.twoText}>冒</Text>
                            <Text style={styles.twoText}>出</Text>
                            <Text style={styles.twoText}>来</Text>
                            <Text style={styles.twoText}>了</Text>
                        </Animated.View> */}
                        <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.Translate} primaryColor='#59b8fa' />

                    </TwoLevelHeader>}
                // HeaderComponent={() => <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.Translate} primaryColor='#59b8fa' />}
                // enableRefresh={false}
                >

                    <View style={{ height: screenHeight }} collapsable={false}>
                        <View style={{ height: 60, }} collapsable={false}></View>
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
                    </View>
                </SmartRefreshLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        width: Dimensions.get('window').width,
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
    twoText: {
        color: 'yellow',
        fontSize: 30,
        marginVertical: 10
    }
})

export default TwoLevelDemo;
