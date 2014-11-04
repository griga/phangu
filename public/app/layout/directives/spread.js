define(['app'], function (app) {
    "use strict";

    return app.directive('spread', function ($rootScope, CssSrv) {


        return {
            restrict: 'A',
            compile: function (element, attributes) {
                element.removeAttr('spread');

                var $content = element.closest('#content');


                var selector = '#' + element.attr('id');

                function processHeight(height) {

                    var leadingY = element.offset().top - $content.offset().top;
                    CssSrv.add(selector, 'height', (height - leadingY - 1) + 'px');
                }

                if (CssSrv.appViewSize && CssSrv.appViewSize.height) {
                    processHeight(CssSrv.appViewSize.height)
                }

                var listenerDestroy = $rootScope.$on('contentResizeEnd', function (event, data) {
                    processHeight(data.height)
                });

                element.on('$destroy', function () {
                    listenerDestroy();
                    CssSrv.remove(selector, 'height');
                });

            }
        }

    })

});