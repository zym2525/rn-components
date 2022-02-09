import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    Provider as PaperProvider,
    Colors
} from 'react-native-paper';
import { DefaultTheme as ZeroDDefaultTheme, } from '@zero-d/rn-components'

export const CombinedDefaultTheme = {
    ...NavigationDefaultTheme,
    ...ZeroDDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...ZeroDDefaultTheme.colors,
    },
};