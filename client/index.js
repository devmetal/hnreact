import React from 'react';
import routes from '../shared/routes';
import DevTools from '../shared/container/DevTools/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { configureStore } from '../shared/redux/store/configureStore';
import { whyDidYouUpdate } from 'why-did-you-update';

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');

require('../static/sass/main.scss');

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }

  whyDidYouUpdate(React);
}

if (process.env.CLIENT && !window.devToolsExtension) {
  const devToolsDest = document.createElement('div');
  dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );
}

window.onload = () => {
  [...document.querySelectorAll('.hide-until-loaded')].forEach((elem) => {
    elem.classList.remove('hide-until-loaded');
  });
};
