import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './components/App/app.component';

import './styles/global.css';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, []);
