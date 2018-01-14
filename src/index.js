import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import configureStore from './store/store';
import App from './components/App';
import Helmet from 'react-helmet';
import './assets/main.styl';
import 'rxjs';

const store = configureStore();

render(
  <div id="outer">
    <Helmet>
      <link rel="shortcut icon" href="../static/favicon.png" />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('app') // eslint-disable-line
);
