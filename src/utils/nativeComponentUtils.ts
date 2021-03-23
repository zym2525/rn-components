import { UIManager } from 'react-native';

export function getViewManagerConfig(viewManagerName: string) {
    return UIManager.getViewManagerConfig(viewManagerName);
}