define(['app', 'lodash'], function (app, _) {

    "use strict";


    return app.directive('resizeDetect', function ($rootScope, $timeout, $interval, $q, CssSrv) {
        var initialized = false, initializedResolver = $q.defer();
        initializedResolver.promise.then(function () {
            initialized = true;
        });

        var $window = $(window),
            $document = $(document),
            $html = $('html'),
            $body = $('body'),
            $navigation,
            $footer;


        (function cacheElements() {
            $navigation = $('#navigation');
            $footer=$('footer');
            if (_.every([$navigation, $footer], function ($it) {
                    return angular.isNumber($it.height())
                })) {
                initializedResolver.resolve();
            } else {
                $timeout(cacheElements, 100);
            }
        })();

        return {
            restrict: 'A',
            compile: function (element) {
                element.removeAttr('resize-listener');


                var appViewHeight = 0,
                    appViewWidth = 0,
                    calcWidth,
                    calcHeight,
                    deltaX,
                    deltaY;

                var forceResizeTrigger = false;

                function resizeDetect() {

                    var $content = $('#content');
                    var contentXPad = $content.outerWidth(true) - $content.width();
                    var contentYPad = $content.outerHeight(true) - $content.height();


                    calcWidth = $window.width() - contentXPad;
                    calcHeight = $window.height() - contentYPad - $navigation.outerHeight(true) - $footer.outerHeight(true);

                    deltaX = appViewWidth - calcWidth;
                    deltaY = appViewHeight - calcHeight;
                    if (Math.abs(deltaX) || Math.abs(deltaY) || forceResizeTrigger) {
                        contentResizeStart();
                        appViewWidth = calcWidth;
                        appViewHeight = calcHeight;
                        forceResizeTrigger = false;
                        contentResizeEnd();
                    }
                }

                var contentResizeStart = _.debounce( function (){
                    //console.log('contentResizeStart', calcWidth, calcHeight);
                    $rootScope.$broadcast('contentResizeStart', {
                        width: calcWidth,
                        height: calcHeight,
                        deltaX: deltaX,
                        deltaY: deltaY
                    });
                }, 250, {leading: true});

                var contentResizeEnd = _.debounce( function (){
                    //console.log('contentResizeEnd', calcWidth, calcHeight);
                    $rootScope.$broadcast('contentResizeEnd', {
                        width: calcWidth,
                        height: calcHeight,
                        deltaX: deltaX,
                        deltaY: deltaY
                    });
                }, 300);


                var looping = false;
                $interval(function () {
                    if (looping) loop();
                }, 300);

                var debouncedRun = _.debounce(function () {
                    run(300)
                }, 300);

                function run(delay) {
                    initializedResolver.promise.then(function () {
                        attachResizeDetection(delay);
                    });
                }

                run(10);

                function detachResizeDetection() {
                    looping = false;
                }

                function attachResizeDetection(timeout) {
                    $timeout(function () {
                        looping = true;
                    }, timeout);
                }

                function loop() {
                    resizeDetect();
                }
            }
        }
    });

});