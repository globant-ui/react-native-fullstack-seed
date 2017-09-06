import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  Spinner,
  Text,
  Card,
  CardItem,
} from 'native-base'

import POST_QUERY from '../../graphql/post.query'

class PostScreen extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func,
    error: PropTypes.string,
    loading: PropTypes.bool,
    post: PropTypes.object,
  };

  render() {
    const { navigation, error, loading, post } = this.props

    let loader, errorMessage, postTemplate

    if (error) {
      errorMessage = <Text>Error en la conexión</Text>
    } else {
      loader = loading ? <Spinner></Spinner>: null
    }

    if (post) {
      postTemplate = <Card>
        <CardItem header>
          <Text>{ post.title }</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{ post.body }</Text>
          </Body>
        </CardItem>
      </Card>
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={ () => navigation.goBack() }>
              <Icon ios='ios-arrow-round-back-outline' android="md-arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>Post Details</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          { errorMessage }
          { loader }
          { postTemplate }
        </Content>
      </Container>
    )
  }
}

PostScreen.navigationOptions = {
  header: null,
};

export default graphql(POST_QUERY, {
  options: ({ navigation: { state }}) => {
    return {
      variables: {
        id: state.params.postId,
      }
    }
  }, 
  props({ ownProps: { navigation }, data: { error, loading, getPost } }) {
    return {
      navigation,
      error,
      loading,
      post: getPost
    };
  },
})(PostScreen)