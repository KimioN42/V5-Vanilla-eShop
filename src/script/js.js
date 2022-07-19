const App = {
    init() {
        console.log("start");

        //actual layout
        // this.controllers.createLayout();
        // this.controllers.router();

        //testing buttons
        // const el = this.controllers.createBtn("test", "primary", () => {
        //     console.log("clicked");
        // });
        // this.elements.root.appendChild(el);

        // const el2 = this.controllers.createBtn("test", "secondary");
        // this.elements.root.appendChild(el2);

        // const el3 = this.controllers.createBtn("test", "default");
        // this.elements.root.appendChild(el3);

        // const el4 = this.controllers.createBtn("test", "other");
        // this.elements.root.appendChild(el4);

        const images = [
            "./assets/product1.png",
            "./assets/product2.png",
            "./assets/product3.png"
        ];


        //testing cards
        const card1 = this.controllers.createCard(images, "Croissant", "2", "random desc", () => { console.log("added to cart"); });
        this.elements.root.appendChild(card1);


        //testing modal
        // const modal = this.controllers.createModal("hello");
        // this.elements.root.appendChild(modal);

        // const showBtn = this.controllers.createBtn("show", "primary", () => {
        //     this.controllers.openModal(modal);
        // });
        // this.elements.root.appendChild(showBtn);

        console.log("end");
    },

}
