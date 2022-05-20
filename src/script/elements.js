App.elements = {
    root: document.getElementById("app"),
    header: {
        container: document.createElement("section"),
        logo: document.createElement("img"),
        cartIcon: document.createElement("img")

    },
    body: {
        container: document.createElement("section"),
        main: {
            container: document.createElement("section"),
            bgImg: document.createElement("img"),
            title: document.createElement("h1"),
            description: document.createElement("p"),
            items: []
        },
        checkout: {
            container: document.createElement("div"),
            title: document.createElement("h1"),
            items: [],
            confirmBtnContainer: document.createElement("div"),
            confirmBtn: document.createElement("button")
        },
    },

    footer: {
        container: document.createElement("section"),
        logo: document.createElement("img")
    }
}