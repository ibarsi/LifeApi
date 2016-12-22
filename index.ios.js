// @flow

import { AppRegistry } from 'react-native';

// import Storage from 'react-native-storage';

import BugSnag from './app/helpers/bugsnag_helper';
import Navigation from './app/modules/navigation/navigation';

// global.storage = new Storage({
//     size: 1000,
//     storageBackend: AsyncStorage,
//     // 1 day (1000 * 3600 * 24 milliseconds).
//     // Can be null, which means never expire.
//     defaultExpires: 1000 * 3600 * 24,
//     enableCache: true,
//     sync: {
//         // TODO: Look into implementing this.
//     }
// });

AppRegistry.registerComponent('LifeApi', () => Navigation);
