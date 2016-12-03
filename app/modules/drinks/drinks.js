// @flow

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Title, Button, Icon, Text } from 'native-base';

import moment from 'moment';

import DrinkButton from './drink_button';
import error from '../../helpers/error_helper';
import request from '../../helpers/request_helper';
import config from '../../../config.json';

class Drinks extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            num_of_drinks: 0,
            max_drinks: 10
        };
    }

    componentDidMount() {
        this._getTodaysDrinks()
            .then(drinks => {
                let now = moment();

                let todays_drinks = drinks.filter(function (drink) {
                    return now.diff(drink.date_consumed, 'days') === 0;
                });

                this.setState({
                    todays_drinks: todays_drinks.length
                });
            })
            .catch(exception => error.handler('Crap!', 'Server\'s dead, go home and fix it.', exception));
    }

    componentWillUnmount() {
         // TODO: Would be nice if AJAX request could be aborted on dismount.
    }

    // PUBLIC
    postDrink() {
        if (!__DEV__) {
            request.post(`${config.api_root}${config.api_drinks}`)
                .then(() => {
                    this.setState({
                        todays_drinks: this.state.todays_drinks + 1
                    });
                })
                .catch(exception => error.handler('Crap!', 'Server\'s dead, go home and fix it.', exception));
        }
        else {
            // TODO: Temp debug mode.
            this.setState({
                todays_drinks: this.state.todays_drinks + 1
            });
        }
    }

    // PRIVATE
    _getTodaysDrinks() {
        return request.get(`${config.api_root}${config.api_drinks}`)
            .then(response => {
                return response.body;
            });
    }

    _setDrinkBadgeStyle(drink_count) {
        let styles = {};

        if (drink_count <= 0) {
            styles = {
                fontSize: 20,
                color: 'black'
            };
        }
        else if (drink_count <= 3) {
            styles = {
                fontSize: 30,
                color: 'green'
            };
        }
        else if (drink_count <= 6) {
            styles = {
                fontSize: 40,
                color: 'orange'
            };
        }
        else {
            styles = {
                fontSize: 50,
                color: 'red'
            };
        }

        return styles;
    }

    _back() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={ () => this.props.navigator.pop() }>
                        <Icon name='ios-arrow-back' />
                    </Button>

                    <Title>
                        Drinks
                    </Title>
                </Header>

                <Content>
                    <DrinkButton drink_callback={ this.postDrink.bind(this) } />

                    <Text style={ styles.drink_count_label }>
                        Total Drinks Today:
                    </Text>

                    <Text style={ [styles.drink_count_value, this._setDrinkBadgeStyle(this.state.todays_drinks)] }>
                        { this.state.todays_drinks }
                    </Text>
                </Content>
            </Container>
        );
    }
}

Drinks.propTypes = {
    navigator: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    drink_count_label: {
        paddingTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    drink_count_value: {
        paddingTop: 80,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default Drinks;
