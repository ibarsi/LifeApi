/* ==================================================
   NAVIGATION
================================================== */

// @flow

import React from 'react';
import { StyleSheet, View, Navigator } from 'react-native';

import Home from '../home/home';
import Drinks from '../drinks/drinks';

const Navigation = () =>
    <View style={ styles.container }>
        <Navigator
            style={ styles.navigator }
            initialRoute={ { id: 'home' } }
            renderScene={ renderScene } />
    </View>;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigator: {
        flex: 1
    }
});

// PUBLIC

export const navigate = function(navigator, view) {
    navigator.push({
        id: view
    });
};

// PRIVATE

function renderScene(route, navigator) {
    switch (route.id) {
        case 'home':
            return (
                <Home navigator={ navigator } />
            );
        case 'drinks':
            return (
                <Drinks navigator={ navigator } />
            );
        default:
            // TODO: Make this a 404 page.
            return (
                <Home navigator={ navigator } />
            );
    }
}

export default Navigation;
