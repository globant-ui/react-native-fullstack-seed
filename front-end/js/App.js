// Framework
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodePush from 'react-native-code-push';
import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

// Router
import MainStackNavigator from './navigators/MainStackNavigator';

// Components
import ProgressBar from './components/ProgressBar';

// Theme
import theme from './themes/base-theme';

// Styles
import Styles from './AppStyles';

/**
 * App component.
 *
 * @namespace App
 */
class App extends Component {

  /**
   * All properties passed to this components must be added here
   */
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.object
  };

  /**
  * @constructor
  * @param {object} props - Properties that come from the redux store
  */
  constructor(props) {
    super(props);

    // Local state
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    };
  }

  /**
   * <p>This is executed after the component is mounted on the virtual dom.</p>
   * 
   * <p>Here we call <a href="https://github.com/Microsoft/react-native-code-push">CodePush</a>.
   * We use this tool form Microsoft to send live updates to the application without releaseing on 
   * the stores.
   * When there is an update we show a modal with the progress and update the local state</p>
   * 
   */
  componentDidMount() {
    CodePush.sync(
      { updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      status => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: receivedBytes / totalBytes * 100 });
      }
    );
  }

  /**
   * <p>Renders a modal if there is and update, or a StackRouter if update is done or no update at all.</p>
   *
   */
  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container
          theme={theme}
          style={{ backgroundColor: theme.defaultBackgroundColor }}
        >
          <Content style={Styles.container}>
            <Modal
              style={[Styles.modal, Styles.modal1]}
              backdrop={false}
              ref={c => {
                this._modal = c;
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  padding: 20
                }}
              >
                {this.state.showInstalling
                  ? <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15
                      }}
                    >
                      Installing update...
                    </Text>
                  : <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        padding: 20
                      }}
                    >
                      <Text
                        style={{
                          color: theme.brandPrimary,
                          textAlign: 'center',
                          marginBottom: 15,
                          fontSize: 15
                        }}
                      >
                        Downloading update...
                        {' '}
                        {`${parseInt(this.state.downloadProgress, 10)} %`}
                      </Text>
                      <ProgressBar
                        color='theme.brandPrimary'
                        progress={parseInt(this.state.downloadProgress, 10)}
                      />
                    </View>}
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <MainStackNavigator />;
  }
}

export default App;
