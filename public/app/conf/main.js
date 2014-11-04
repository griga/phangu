window.name = "NG_DEFER_BOOTSTRAP!";

define(['angular', 'domReady', 'app', 'conf/includes'], function(ng, domReady){


    domReady(function(document){
        ng.bootstrap(document, ['app']);
        ng.resumeBootstrap();
    })
});