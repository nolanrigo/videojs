Package.describe({
  name: 'nolanrigo:filemonitor',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'filemonitor': '0.1.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles('filemonitor.js',['server']);
  api.export('filemonitor',['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('nolanrigo:filemonitor');
  api.addFiles('filemonitor-tests.js',['server']);
});
