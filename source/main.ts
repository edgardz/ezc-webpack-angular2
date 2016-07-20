import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './components/App/app.component';

import './styles/global.css';

function main(initialHMRstate) {
  return bootstrap(AppComponent, []);
}

if (process.env.ENV === 'production') {
  enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main(null));
} else {
  require('angular2-hmr').hotModuleReplacement(main, module);
}