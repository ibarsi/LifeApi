// @flow

import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

const styles = StyleSheet.create({
    drink_button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

const DrinkButton = ({ drink_callback }) =>
    <Button block large onPress={ drink_callback }>
        <Text style={ styles.drink_button }>
            DRINK!
        </Text>
    </Button>;

DrinkButton.propTypes = {
    drink_callback: PropTypes.func.isRequired
};

export default DrinkButton;
