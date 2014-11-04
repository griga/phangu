define(['app'], function(module){

    "use strict";

    return module.directive('include', function () {
            return {
                replace: true,
                restrict: 'A',
                templateUrl: function (element, attr) {
                    return attr.include;
                },
                compile: function(element){
                    element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
                }
            };
        }
    );

});
