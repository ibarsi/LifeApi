/* ==================================================
   LOGGER HEPLER
================================================== */

// @flow

import { Alert } from 'react-native';

import BugSnag from './bugsnag_helper';

const logger = {
    error(title, message, stacktrace) {
        if (!__DEV__) {
            BugSnag.notify(stacktrace);

            Alert.alert(
                title,
                message,
                [
                    { text: 'Sigh' }
                ]
            );
        }
        else {
            console.error(title, message, stacktrace);
        }
    }
};

export default logger;
