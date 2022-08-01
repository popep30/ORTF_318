import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getApiBaseUrl() {

  const location = window.location.href;

  let result = '';

  if (location.indexOf('localhost') > -1 ||

    location.indexOf('whatever-dev-is-called') > -1) {

    result = 'https://q7w3dg24tk.execute-api.us-east-1.amazonaws.com/dev/';

  }

  // else if (location.indexOf('mrxintegratestage') > -1) {

  //   // pointed at DEV stage temporarily

  //   result = 'https://btlf0zssmb.execute-api.us-east-1.amazonaws.com/DEV/';

  // }

  // else {

  //   // prod

  //   result = 'https://qxhn8ur5l2.execute-api.us-east-1.amazonaws.com/PROD/';

  // }



  return result;

}

const providers = [

  { provide: 'API_BASE_URL', useFactory: getApiBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
