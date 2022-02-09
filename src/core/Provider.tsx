import * as React from 'react';
import Portal from '../components/Portal';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import type { ScaleSizeProps } from '../styles/scaleSize'

// declare global {
//     namespace ReactNativePaper {

//         interface Theme {
//             scaleSize: ScaleSizeProps;
//         }
//     }
// }
console.log('process:', process);
export const defaultTheme: ReactNativePaper.Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};

export interface ProviderProps extends React.ComponentProps<typeof PaperProvider> {

}

const Provider: React.FC<ProviderProps> = ({ children, theme = defaultTheme, settings }) => {
    return <PaperProvider settings={settings} theme={theme}>
        <Portal.Host>{children}</Portal.Host>
    </PaperProvider>
}

export default Provider