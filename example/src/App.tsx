import * as React from 'react';

// import { StyleSheet, View, Text } from 'react-native';
import AppNavigator from './routers/appNavigator'
import { Provider as ZeroProvider } from '@zero-d/rn-components'
import { CombinedDefaultTheme } from './style/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <ZeroProvider theme={CombinedDefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </ZeroProvider>
  );
}

