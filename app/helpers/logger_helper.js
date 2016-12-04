/* ==================================================
   LOGGER HEPLER
================================================== */

import { Alert } from 'react-native';

const logger = {
    error(title, message, stacktrace) {
        if (!__DEV__) {
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
