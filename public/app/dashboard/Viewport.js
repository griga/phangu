define(['app'], function(app){

    return app.directive('viewport', function($rootScope, $timeout, Game){

        return {
            restrict: 'A',
            link: function(scope, element, attributes){

                var containerId = element.attr('id');

                $rootScope.$on('contentResizeEnd', function(event, data){
                    $timeout(function(){
                        Game.init(element.width(), element.height(), containerId);
                    }, 50)
                })
            }
        }
    });
});