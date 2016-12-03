// @flow

import React, { Component, PropTypes } from 'react';
import { Container, Header, Content, Title, Button } from 'native-base';

class Home extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>
                        Home
                    </Title>
                </Header>

                <Content>
                    <Button block onPress={ this.navigate.bind(this) }>
                        Drinks
                    </Button>
                </Content>
            </Container>
        );
    }

    navigate() {
        this.props.navigator.push({
            id: 'drinks'
        });
    }
}

export default Home;
