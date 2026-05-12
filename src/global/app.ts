import { registerNavigationApi } from './navigation.js'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'
import '@material/web/button/filled-button'
import '@material/web/button/text-button'
import '@material/web/button/outlined-button'
import '@material/web/iconbutton/filled-icon-button'
import '@material/web/iconbutton/icon-button'
import '@material/web/textfield/outlined-text-field'
import '@material/web/select/outlined-select'
import '@material/web/select/select-option'
import '@material/web/divider/divider'

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