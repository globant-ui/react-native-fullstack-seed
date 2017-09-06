// Frameworks
import React, { Component } from 'react';
import Types from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content
} from 'native-base';

// Routes
const routes = ['Home', 'Posts'];

/**
 * <p>Contains the drawer menu</p>
 */
class DrawBar extends Component {
  /**
   * All properties passed to this components must be added here
   */
  static propTypes = {
    navigation: Types.object
  };

  /**
   * Navigation options
   */
  static navigationOptions = {
    header: null
  };

  /**
   * Renders the left drawer menu
   */
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/drawer-cover.png'
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => this.props.navigation.navigate('DrawerClose')}
            >
              <Image
                square
                style={{ height: 80, width: 70 }}
                source={{
                  uri: 'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/logo.png'
                }}
              />
            </TouchableOpacity>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default DrawBar;
