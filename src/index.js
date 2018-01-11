import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import configureStore from './store/store';
import App from './components/App';
import './assets/main.styl';
import 'rxjs';

const store = configureStore();

render(
  <div id="outer">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('app') // eslint-disable-line
);
