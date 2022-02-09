import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setConfig } from '@zero-d/rn-components'

setConfig({
    portraitWidth: 1920
})

AppRegistry.registerComponent(appName, () => App);
