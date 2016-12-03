// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Navigator } from 'react-native';

import Home from '../home/home';
import Drinks from '../drinks/drinks';

class Navigation extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Navigator
                    style={ styles.navigator }
                    initialRoute={ { id: 'home' } }
                    renderScene={ this.renderScene } />
            </View>
        );
    }

    renderScene(route, navigator) {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigator: {
        flex: 1
    }
});

export default Navigation;
