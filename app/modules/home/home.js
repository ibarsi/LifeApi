/* ==================================================
   HOME
================================================== */

// @flow

import React from 'react';
import { Container, Header, Content, Title, Button } from 'native-base';

import { navigate } from '../navigation/navigation';

const Home = ({ navigator }) =>
    <Container>
        <Header>
            <Title>
                Home
            </Title>
        </Header>

        <Content>
            <Button block onPress={ () => navigate(navigator, 'drinks') }>
                Drinks
            </Button>
        </Content>
    </Container>;

Home.propTypes = {
    navigator: React.PropTypes.object.isRequired
};

export default Home;
