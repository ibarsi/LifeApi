/* ==================================================
   BUGSNAG HEPLER
================================================== */

// @flow

import { Client, Configuration } from 'bugsnag-react-native';

import { version } from '../../package.json';
import { bugsnag_key } from '../../config.json';

let config = new Configuration(bugsnag_key);
config.appVersion = version;
config.notifyReleaseStages = ['production'];
config.releaseStage = __DEV__ ? 'development' : 'production';

const BugSnag = new Client(config);

export default BugSnag;
