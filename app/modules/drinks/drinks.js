// @flow

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Title, Button, Icon, Text, Spinner } from 'native-base';

import moment from 'moment';

import logger from '../../helpers/logger_helper';
import request from '../../helpers/request_helper';
import promise from '../../helpers/promise_helper';
import config from '../../../config.json';

const styles = StyleSheet.create({
    drink_button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
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

class Drinks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num_of_drinks: 0,
            max_drinks: 10
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        this._getTodaysDrinks()
            .then(drinks => {
                let today = moment().startOf('day');

                let todays_drinks = drinks.filter(drink => today.diff(moment(drink.date_consumed).startOf('day').format(), 'days') === 0 );

                this.setState({
                    todays_drinks: todays_drinks.length,
                    loading: false
                });
            })
            .catch(exception => logger.error('Crap!', 'Server\'s dead, go home and fix it.', exception));
    }

    componentWillUnmount() {
         // TODO: Would be nice if AJAX request could be aborted on dismount.
    }

    // PUBLIC
    postDrink() {
        if (!__DEV__) {
            this.setState({
                loading: true
            });

            Promise.all([request.post(`${config.api_root}${config.api_drinks}`), promise.delay(500)])
                .then(() => {
                    this.setState({
                        todays_drinks: this.state.todays_drinks + 1,
                        loading: false
                    });
                })
                .catch(exception => logger.error('Crap!', 'Server\'s dead, go home and fix it.', exception));
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
            .then(response => response.body);
    }

    _setDrinkBadgeStyle(drink_count) {
        let badge_styles = {};

        if (drink_count <= 0) {
            badge_styles = {
                fontSize: 20,
                color: 'black'
            };
        }
        else if (drink_count <= 3) {
            badge_styles = {
                fontSize: 30,
                color: 'green'
            };
        }
        else if (drink_count <= 6) {
            badge_styles = {
                fontSize: 40,
                color: 'orange'
            };
        }
        else {
            badge_styles = {
                fontSize: 50,
                color: 'red'
            };
        }

        return badge_styles;
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
                    <Button block large disabled={ this.state.loading } onPress={ this.postDrink.bind(this) }>
                        <Text style={ styles.drink_button }>
                            DRINK!
                        </Text>
                    </Button>

                    <Text style={ styles.drink_count_label }>
                        Total Drinks Today:
                    </Text>

                    { this.state.loading ?
                        <Spinner color="blue" />
                        :
                        <Text style={ [styles.drink_count_value, this._setDrinkBadgeStyle(this.state.todays_drinks)] }>
                            { this.state.todays_drinks }
                        </Text>
                    }
                </Content>
            </Container>
        );
    }
}

Drinks.propTypes = {
    navigator: PropTypes.object.isRequired
};

export default Drinks;
