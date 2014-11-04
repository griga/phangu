var require = {
    waitSeconds: 0,
    baseUrl: "../app/",
    paths: {
        'jquery': '../../vendor/jquery/dist/jquery',
        'angular': '../../vendor/angular/angular',
        'lodash': '../../vendor/lodash/dist/lodash',
        'phaser': '../../vendor/phaser/build/phaser',
        'domReady': '../../vendor/requirejs-domready/domReady'
    },
    shim: {
        'angular': {'exports': 'angular',
            'deps': ['jquery']
        }
    },
    priority: [
        'jquery',
        'angular'
    ]
};