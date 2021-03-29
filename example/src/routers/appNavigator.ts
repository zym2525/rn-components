import { createStackNavigator, } from 'react-navigation-stack';
import { horizontalNavigationOptions, transparencyStatusBarHeaderConfig } from './config'

// import { AppStack } from './tabNavigator'
import HomeScreen from '../views/Home/Home'


export const AppNavigator = createStackNavigator(
    {
        // AppStack: AppStack,
        Home: HomeScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            ...transparencyStatusBarHeaderConfig,
            ...horizontalNavigationOptions
        }
    },
)