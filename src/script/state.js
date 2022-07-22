App.state = {
    products: [
        {
            id: 1,
            name: "Croissant",
            price: "2",
            desc: "Amazing butter croissant",
            images: ["./assets/product1.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2018_01_Croissant_IMG_0685.JPG/1024px-2018_01_Croissant_IMG_0685.JPG"]
        },
        {
            id: 2,
            name: "French Toast",
            price: "1.50",
            desc: "Best french toast",
            images: ["./assets/product2.png"]
        },
        {
            id: 3,
            name: "Bagel",
            price: "4",
            desc: "Super bagel",
            images: ["./assets/product3.png"]
        }
    ],
    routes: {
        home: window.location.origin + window.location.pathname,
        cart: "?p=cart",
    },
    routeRendered: false,
}
