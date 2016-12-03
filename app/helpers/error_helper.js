import { Alert } from 'react-native';

const error_helper = {
    handler(title, message, stacktrace) {
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

export default error_helper;
