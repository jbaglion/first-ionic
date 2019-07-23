import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  endpoints: {
    // localhost
    // api: 'http://localhost:5000/api/',
    // security: 'http://localhost:5003/security/',
    // oldExranet: 'http://localhost:2128/',

    // Produccion
    // site: http://paramedicapps.com.ar:5567/'
    api: 'http://paramedicapps.com.ar:5566/api/',
    security: 'http://paramedicapps.com.ar:5568/security/',
    oldExranet: 'http://paramedicapps.com.ar:58885/'

    // Server Local Pilar
    // api: 'http://192.168.5.95:5566/api/',
  },
  // votesLimit: 3,
  // topHeroesLimit: 4,
  snackBarDuration: 3700,
  // repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
