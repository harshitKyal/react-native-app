<script src="http://192.168.43.213:8097"></script>
import * as React from 'react';
import Main from "./components/MainComponent";
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
        
      )
    }
}
