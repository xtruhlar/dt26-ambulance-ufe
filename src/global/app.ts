import { registerNavigationApi } from './navigation.js'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'

function loadGoogleFont(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

export default function() {
  loadGoogleFont('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  loadGoogleFont('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
  registerNavigationApi()
}