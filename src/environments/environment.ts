// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyB-D1dlEa_OO7mmYPrYGtNCp_95VnWN1oE',
    authDomain: 'intelibpoapp.firebaseapp.com',
    databaseURL: 'https://intelibpoapp.firebaseio.com',
    projectId: 'intelibpoapp',
    storageBucket: 'intelibpoapp.appspot.com',
    messagingSenderId: '754032515604',
    appId: '1:754032515604:web:1d972a10918052c6062501'
  },
  urlRestAPI: 'http://localhost:4000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
