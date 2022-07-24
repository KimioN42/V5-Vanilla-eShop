App.state = {
    products: [
        {
            id: 1,
            name: "Croissant",
            price: "2",
            desc: "Amazing butter croissant",
            images: ["./assets/product1.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2018_01_Croissant_IMG_0685.JPG/1024px-2018_01_Croissant_IMG_0685.JPG",
                "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",]
        },
        {
            id: 2,
            name: "French Toast",
            price: "1.50",
            desc: "Best french toast",
            images: ["./assets/product2.png",
                "https://www.foodnetwork.com/content/dam/images/food/video/2022/1/31/0/ie0309-french-toast.jpg",
                "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=%5B711%2C451%5D&w=1582&h=791&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F08%2F7016-french-toast-mfs-010.jpg"]
        },
        {
            id: 3,
            name: "Bagel",
            price: "4",
            desc: "Super bagel",
            images: ["./assets/product3.png",
                "https://www.myjewishlearning.com/wp-content/uploads/2019/02/New-York-Bagel-recipe.jpg",
                "https://sallysbakingaddiction.com/wp-content/uploads/2018/12/bagels.jpg"]
        },
        {
            id: 4,
            name: "Sprinkled Donut",
            price: "1.50",
            desc: "Best donut in town",
            images: ["https://deliciouslysprinkled.com/wp-content/uploads/2015/04/Baked-Vanilla-Donuts-blog.jpg",
                "https://thefirstyearblog.com/wp-content/uploads/2018/05/baked-donuts-square.png",
                "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Farchive%2Fc4637db1a78eec50564c260bb357aa07ec725d27"
            ]
        }
    ],
    //products array
    cart: [],
    routes: {
        home: window.location.origin + window.location.pathname,
        cart: "?p=cart",
    },
    routeRendered: false,
    mutations: {
        addToCart(product) {
            if (App.state.cart.find(p => p.id === product.id)) {
                return "Product already in cart";
            }
            App.state.cart.push(product);
            return "Product added to cart";
        },
        getCartCount() {
            return App.state.cart.length;
        }
    },

}
