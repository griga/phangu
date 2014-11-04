define(['../app'], function(app){
    "use strict";

    return app.controller('PlaybackCtrl', function($scope){

        $scope.state = undefined;
        $scope.play = function(){
            $scope.state = 'play';
        }
        $scope.pause = function(){
            $scope.state = 'pause';
        }
    })
});