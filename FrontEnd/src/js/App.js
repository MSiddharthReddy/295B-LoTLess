// Empty object
App = {};

App = {

    logout: function() {
        document.location.href = "#/login";
    },

    toggleSideNav: function(e) {
        $(".side-wrapper").toggleClass("hide-side-bar");
        $(".main-wrapper").toggleClass("expand-main-wrapper");
        $(".stage").toggleClass("stage-padded");
    },

    init: function() {
        NProgress.configure({
            showSpinner: false
        });

        $(document).ajaxStart(function() {
            NProgress.start();
        });

        $(document).ajaxStop(function() {
            NProgress.done();
        });

        App.toggleSideNav();
        $("#side-nav").on("click", function(e) {
            e.preventDefault();
            App.toggleSideNav();
        });

        $('#full-screen').click(function() {
            $(document).toggleFullScreen();
            return false;
        });

        $(".ui.dropdown").dropdown({
            allowCategorySelection: true,
            transition: "fade up",
            context: 'sidebar',
            on: "hover"
        });

        $('.ui.accordion').accordion({
            exclusive: false,
            selector: {}
        });

    }
};

// The App is attached to the global object, which in this case is the Window object
window.App = App;