App.elements = {
    root: document.getElementById("app"),
    header: {
        container: document.createElement("section"),
        logo: document.createElement("img"),
        cartIcon: document.createElement("img")

    },
    body: {
        container: document.createElement("section"),
        bgImg: document.createElement("img"),
        title: document.createElement("h1"),
        description: document.createElement("p"),
        items: []
    },
    footer: {
        container: document.createElement("section"),
        logo: document.createElement("img")
    }
}