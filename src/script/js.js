const App = {
    init() {
        console.log("starting rendering");

        this.controllers.loadLocalStorage();
        this.controllers.createLayout();
        this.controllers.router();


        console.log("finishing rendering");
    },

}
