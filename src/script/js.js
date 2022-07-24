const App = {
    init() {
        console.log("starting rendering");

        this.controllers.createLayout();
        this.controllers.router();

        console.log("finishing rendering");
    },

}
