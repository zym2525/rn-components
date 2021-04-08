import { createStackNavigator, } from 'react-navigation-stack';
import { horizontalNavigationOptions, transparencyStatusBarHeaderConfig } from './config'
import { createAppContainer } from 'react-navigation'

// import { AppStack } from './tabNavigator'
import HomeScreen from '../views/Home/Home'
import StickyScreen from '../views/StickyItem/StickyItem'
import BottomSheetScreen from '../views/BottomSheet/BottomSheet'
import BottomSheetIndexScreen from '../views/BottomSheet/index'
import BlurToolbarScreen from '../views/BottomSheet/BlurToolbar'
import RefreshListScreen from '../views/RefreshList/RefreshList'
import RefreshLayoutIndexScreen from '../views/RefreshList/index'
import TwoLevelDemoScreen from '../views/RefreshList/TwoLevelDemo'
import PureScrollModeScreen from '../views/RefreshList/PureScrollMode'

export const AppNavigator = createAppContainer(createStackNavigator(
    {
        // AppStack: AppStack,
        Home: HomeScreen,
        RefreshLayoutIndex: RefreshLayoutIndexScreen,
        RefreshList: RefreshListScreen,
        TwoLevelDemo: TwoLevelDemoScreen,
        PureScrollMode: PureScrollModeScreen,
        StickyItem: StickyScreen,
        BottomSheetIndex: BottomSheetIndexScreen,
        BottomSheet: BottomSheetScreen,
        BlurToolbar: BlurToolbarScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            // ...transparencyStatusBarHeaderConfig,
            ...horizontalNavigationOptions
        }
    },
))