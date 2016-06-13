angular.module('yapp')
    .service('Authorization', function($state, $window) {
        this.authorized = $window.localStorage.authorized;
        this.memorizedState = null;
        this.token = $window.localStorage.token;

        var
        clear = function() {
            this.authorized = false;
            this.memorizedState = null;
            this.token = null;
        },

        go = function(fallback) {
            this.authorized = true;
            var targetState = this.memorizedState ? this.memorizedState : fallback;
            $state.go(targetState);
        };

        return {
            authorized: this.authorized,
            memorizedState: this.memorizedState,
            clear: clear,
            token: this.token,
            go: go
        };
    });