import * as React from 'react';

// import { StyleSheet, View, Text } from 'react-native';
import { AppNavigator } from './routers/appNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ZeroProvider } from '@zero-d/rn-components'

export default function App() {
  return (
    <PaperProvider>
      <ZeroProvider>
        <AppNavigator />
      </ZeroProvider>
    </PaperProvider>
  );
}

