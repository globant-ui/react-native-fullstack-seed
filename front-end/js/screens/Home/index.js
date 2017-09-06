// Framework
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Grid,
  Row
} from 'native-base';

import { setIndex } from '../../actions/list';
import { logout } from '../../actions/auth';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: PropTypes.string,
    setIndex: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.string),
    openDrawer: PropTypes.func,
    navigation: PropTypes.object,
    logout: PropTypes.func
  };

  render() {
    const { logout, navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                logout();
              }}>
              <Icon active name='power' />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('DrawerOpen');
              }}
            >
              <Icon active name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Grid style={styles.mt}>
            {this.props.list.map((item, i) => (
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {} }
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            ))}
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    logout: () => dispatch(logout()),
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);