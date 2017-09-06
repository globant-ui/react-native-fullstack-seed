// Framework
import { StackNavigator } from 'react-navigation'

// Screens
import Posts from '../screens/Posts'
import PostDetails from '../screens/PostDetails'

/**
 * @module StackRouter
 */

/**
 * Refer to <a href="https://reactnavigation.org/docs/navigators/stack">Stack navigator</a>
 * @const
 */
const PostsStackNavigator = StackNavigator({
  Posts: {
    screen: Posts
  },
  PostDetails: {
    screen: PostDetails
  }
}, { headerMode: 'screen' })

export default PostsStackNavigator