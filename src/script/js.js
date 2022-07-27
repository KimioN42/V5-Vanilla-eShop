const App = {
    init() {
        console.log("starting rendering");

        // this.controllers.loadLocalStorage();
        // this.controllers.createLayout();
        // this.controllers.router();
        const modal = App.controllers.createModal("What's up");
        const el = App.controllers.createBtn("open modal", "secondary", () => {
            console.log("clicked");
            this.controllers.openModal(modal);
        });
        this.elements.root.appendChild(el);


    }
}
