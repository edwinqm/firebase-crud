import { IConfig } from './iconfig';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const CONFIG: IConfig = {
  'firebaseConfig': {
    apiKey: 'AIzaSyC2qz5FnqjR67R0sqt4GcYbFtNSGvM-efw',
    authDomain: 'angular-auth-fc712.firebaseapp.com',
    databaseURL: 'https://angular-auth-fc712.firebaseio.com',
    projectId: 'angular-auth-fc712',
    storageBucket: 'angular-auth-fc712.appspot.com',
    messagingSenderId: '597549896758'
  }
};
