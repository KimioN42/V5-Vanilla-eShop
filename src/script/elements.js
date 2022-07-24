App.elements = {
    root: document.getElementById("app"),
    header: {
        container: document.createElement("section"),
        logo: document.createElement("img"),
        cartContainer: document.createElement("div"),
        cartIcon: document.createElement("img"),
        cartCount: document.createElement("span"),
    },
    body: {
        container: document.createElement("section"),
        error: {
            container: document.createElement("section"),
            title: document.createElement("h1"),
            description: document.createElement("p"),
        },
        main: {
            container: document.createElement("section"),
            bgImg: document.createElement("img"),
            title: document.createElement("h1"),
            description: document.createElement("p"),
            itemsContainer: document.createElement("div"),

        },
        checkout: {
            container: document.createElement("div"),
            title: document.createElement("h1"),
            confirmBtnContainer: document.createElement("div"),
            confirmBtn: document.createElement("button")
        },
    },

    footer: {
        container: document.createElement("section"),
        logo: document.createElement("img")
    }
}
