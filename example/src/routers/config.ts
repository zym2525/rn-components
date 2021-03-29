import { TransitionPresets } from 'react-navigation-stack';
import { setSizeText, setSize } from '../utils';
import type { NavigationScreenConfig, NavigationRoute } from 'react-navigation'
import type { StackNavigationOptions, StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'

export const horizontalNavigationOptions: NavigationScreenConfig<StackNavigationOptions, StackNavigationProp<NavigationRoute>> = {
    cardOverlayEnabled: true,
    // gestureEnabled: true,
    cardStyle: {
        backgroundColor: '#fff'
    },
    ...TransitionPresets.SlideFromRightIOS
}

export const defaultHeaderConfig: NavigationScreenConfig<StackNavigationOptions, StackNavigationProp<NavigationRoute>> = {
    headerStyle: {
        height: setSize(88),
        elevation: 0,
    },
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
        justifyContent: 'center',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize: setSizeText(30),
    },
    headerLeftContainerStyle: {
        flex: 1,
    },
}

export const transparencyStatusBarHeaderConfig: NavigationScreenConfig<StackNavigationOptions, StackNavigationProp<NavigationRoute>> = {
    ...defaultHeaderConfig,
    headerStyle: {
        ...defaultHeaderConfig.headerStyle,
        height: setSize(128),
    },
}

export const transparencyNoHeaderConfig: NavigationScreenConfig<StackNavigationOptions, StackNavigationProp<NavigationRoute>> = {
    ...defaultHeaderConfig,
    headerStyle: {
        ...defaultHeaderConfig.headerStyle,
        height: setSize(128),
    },
}