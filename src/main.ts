import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { device } from './device';

if (environment.production) {
  enableProdMode();
}

updateFavicon();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


function updateFavicon() {
  const favicon = document.createElement('link');;
  favicon.rel = 'icon';
  favicon.href = device === 'Basil'
    ? 'assets/icon/favicon-basil.png'
    : 'assets/icon/favicon-lilly.png';

  const touchIcon = document.createElement('link');
  touchIcon.rel = 'apple-touch-icon';
  touchIcon.href = device === 'Basil'
    ? 'assets/icon/touchicon-basil.png'
    : 'assets/icon/touchicon-lilly.png'

  document.head.appendChild(favicon);
  document.head.appendChild(touchIcon);
}