import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import swRegister from './utils/sw-register';
import App from './view/app';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => app.renderPage());

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
