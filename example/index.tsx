import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setConfig } from '@zero-d/rn-components'

setConfig({
    portraitWidth: 2000
})

AppRegistry.registerComponent(appName, () => App);
