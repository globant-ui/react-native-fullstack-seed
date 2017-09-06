import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { FlatList, TouchableHighlight } from 'react-native'
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

import POSTS_QUERY from '../../graphql/posts.query'

class PostScreen extends Component {
  static navigationOptions = {
    header: null
  };
  
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func,
    error: PropTypes.string,
    loading: PropTypes.bool,
    getAllPosts: PropTypes.array,
    loadMoreEntries: PropTypes.func,
  };

  constructor () {
    super()
    this._renderItem = this._renderItem.bind(this)
  }

  _keyExtractor(item, index) {
    return index
  }

  _onCardSelected (postId) {
    const { navigate } = this.props
    navigate('PostDetails', postId);
  }

  _renderItem ({ item }) {
    return (
      <TouchableHighlight onPress={ this._onCardSelected.bind(this, item.id) }>
        <Card>
          <CardItem header>
            <Text>{ item.title } : { item.id }</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{ item.body }</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableHighlight>
    )
  }

  render() {
    const { navigation, error, loading, loadMoreEntries, getAllPosts } = this.props

    let loader, errorMessage, list

    if (error) {
      errorMessage = <Text>Error en la conexión</Text>
    } else {
      loader = loading ? <Spinner></Spinner>: null
    }

    if (getAllPosts) {
      list = <FlatList 
        data={ getAllPosts }
        renderItem={ this._renderItem }
        keyExtractor={ this._keyExtractor }
        onEndReachedThreshold={ 0.5 }
        onEndReached={ loadMoreEntries } />
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate('DrawerOpen')}>
              <Icon ios='ios-menu' android="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Posts</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          { errorMessage }
          { loader }
        </Content>
        { list }
      </Container>
    )
  }
}

PostScreen.navigationOptions = {
  header: null,
};

const ITEMS_PER_PAGE = 5; // This can go in a config file
const PostsWithData =  graphql(POSTS_QUERY, {
  options(props) {
    return {
      variables: {
        type: (
          props.params &&
          props.params.type &&
          props.params.type.toUpperCase()
        ) || 'TOP',
        offset: 0,
        limit: ITEMS_PER_PAGE,
      },
      fetchPolicy: 'network-only',
    };
  },
  props({ ownProps: { navigation }, data: { error, loading, fetchMore, getAllPosts } }) {
    return {
      navigation,
      error,
      loading,
      getAllPosts,
      loadMoreEntries() {
        return fetchMore({
          variables: {
            // We are able to figure out which offset to use because it matches
            // the feed length, but we could also use state, or the previous
            // variables to calculate this (see the cursor example below)
            offset: getAllPosts ? getAllPosts.length : 0,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult; }
            return Object.assign({}, previousResult, {
              // Append the new feed results to the old one
              getAllPosts: [...previousResult.getAllPosts, ...fetchMoreResult.getAllPosts],
            });
          },
        });
      },
    };
  },
})(PostScreen)

const PostsWithDataAndState = connect(
  () => {
    return {}
  },
  (dispatch) => ({
    navigate: (route, postId) => {
      dispatch(NavigationActions.navigate({
        routeName: route,
        params: {
          postId: postId
        }
      }))
    },
  }),
)(PostsWithData)

export default PostsWithDataAndState
