/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer'
], function($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'px.ngBindPolymer',
        'dragularModule',
        'ngDraggable'
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', 'PredixUserService', function($scope, $rootScope, predixUserService) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
                { icon: 'fa-dashboard', state: 'Dashboard', label: 'Dashboard' },
                { icon: 'fa-file-o', state: 'databaseconfig', label: 'Database Browser' },
                //{icon: 'fa-cog', state: 'querymodular', label: 'Query Modellar'},
                //{icon: 'fa-industry', state: 'chartgeneration', label: 'Chart Generation'},
                { icon: 'fa-line-chart', state: 'reportwizard', label: 'Report Wizard' },
                { icon: 'fa-industry', state: 'dragger', label: 'dragger' },
                { icon: 'fa-line-chart', state: 'draggablerepwiz', label: 'Draggable Rep Wiz' }

            ]
        };

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'UNAUTHORIZED':
                        //redirect
                        predixUserService.login(toState);
                        break;
                    default:
                        //go to other error state
                }
            } else {
                // unexpected error
            }
        });
    }]);


    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});