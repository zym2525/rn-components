import * as React from 'react';
import { Linking, Platform, Text } from 'react-native';
import {
    createStackNavigator,
    StackScreenProps,
    TransitionPresets,
    StackHeaderProps,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CombinedDefaultTheme } from '../style/theme'

import { Appbar } from 'react-native-paper';

import HomeScreen from '../views/Home/Home'
import StickyScreen from '../views/StickyItem/StickyItem'
// import BottomSheetScreen from '../views/BottomSheet/BottomSheet'
// import BottomSheetIndexScreen from '../views/BottomSheet/index'
// import BlurToolbarScreen from '../views/BottomSheet/BlurToolbar'
import RefreshListScreen from '../views/RefreshList/RefreshList'
import RefreshLayoutIndexScreen from '../views/RefreshList/index'
import LoadingLayoutScreen from '../views/RefreshList/LoadingLayout'
import TwoLevelDemoScreen from '../views/RefreshList/TwoLevelDemo'
import PureScrollModeScreen from '../views/RefreshList/PureScrollMode'
import DraggableScreen from '../views/Draggable/Draggable'
import { WaterfallGridExample as WaterfallGridScreen } from '../views/Draggable/WaterfallGridExample'

function CustomNavigationBar({ navigation, back, options, route }: StackHeaderProps) {

    const title =
        typeof options.headerTitle === 'string'
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : route.name;

    return (
        <Appbar.Header style={{ backgroundColor: '#fff' }}>
            {back ? <Appbar.BackAction touchSoundDisabled onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}

declare global {
    type RootStackParamList = {
        Home: undefined;
        RefreshLayoutIndex: undefined;
        RefreshList: undefined;
        LoadingLayout: undefined;
        TwoLevelDemo: undefined;
        PureScrollMode: undefined;
        StickyItem: undefined;
        // BottomSheetIndex: undefined;
        // BottomSheet: undefined;
        // BlurToolbar: undefined;
        Draggable: undefined;
        WaterfallGrid: undefined;
    };
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

    return (
        <NavigationContainer
            theme={CombinedDefaultTheme}
        >
            <Stack.Navigator
                screenOptions={() => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    header: (props) => <CustomNavigationBar {...props} />,
                })}
            >
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="RefreshLayoutIndex" component={RefreshLayoutIndexScreen} />
                    <Stack.Screen name="RefreshList" component={RefreshListScreen} />
                    <Stack.Screen name="LoadingLayout" component={LoadingLayoutScreen} />
                    <Stack.Screen name="TwoLevelDemo" component={TwoLevelDemoScreen} />
                    <Stack.Screen name="PureScrollMode" component={PureScrollModeScreen} />
                    <Stack.Screen name="StickyItem" component={StickyScreen} />
                    {/* <Stack.Screen name="BottomSheetIndex" component={BottomSheetIndexScreen} /> */}
                    {/* <Stack.Screen name="BottomSheet" component={BottomSheetScreen} /> */}
                    {/* <Stack.Screen name="BlurToolbar" component={BlurToolbarScreen} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Draggable" component={DraggableScreen} />
                    <Stack.Screen name="WaterfallGrid" component={WaterfallGridScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}