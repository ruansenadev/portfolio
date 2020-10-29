// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// staticsHost for mapping images from server cors,
// ex dev: 'http://localhost:3000',
// ex prod: 'https://s3.amazonaws.com/bucketname'

// api address for consuming api,
// ex dev: 'http://localhost:3000/api',
// ex prod: 'https://appname.herokuapp.com/api'

// clientHost for service links share,
// ex dev/prod: `${window.location.protocol}//${window.location.host}`

export const environment = {
  production: false,
  staticsHost: `http://s3.amazonaws.com/portfolio-ruansenadev`,
  api: 'https://portfolio-ruansenadev.herokuapp.com/api',
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
