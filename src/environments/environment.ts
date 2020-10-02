// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//serverHost for mapping images from server cors
//api address for consuming api
//clientHost for services share

export const environment = {
  production: false,
  serverHost: `http://localhost:3000`,
  api: 'http://localhost:3000/api',
  clientHost: `${window.location.protocol}//${window.location.host}`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
