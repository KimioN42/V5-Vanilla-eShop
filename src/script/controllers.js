App.controllers = {
    createHeader() {
        const els = App.elements;
        const header = els.header;

        header.container.style.backgroundColor = "rgba(102, 102, 102, 0.3)";
        header.container.style.display = "flex";
        header.container.style.justifyContent = "space-between";
        header.container.style.alignItems = "center";
        header.container.style.position = "fixed";
        header.container.style.top = "0";
        header.container.style.width = "100%"

        header.logo.src = "./assets/logo.png";
        header.logo.style.margin = "35px 0px 35px 48px";
        header.logo.style.cursor = "pointer";
        header.logo.onclick = () => {
            console.log("home clicked");
            this.go("home")
        }

        header.cartIcon.src = "./assets/cart.png";
        header.cartIcon.style.width = "36px";
        header.cartIcon.style.height = "36px";
        header.cartIcon.style.margin = "0 53px 0 0";
        header.cartIcon.style.cursor = "pointer";
        header.cartIcon.onclick = () => {
            console.log("cart clicked");
            this.go("cart");
        }

        header.container.appendChild(header.logo);
        header.container.appendChild(header.cartIcon);
        els.root.appendChild(header.container);
    },
    createMain() {
        const els = App.elements;
        const main = els.body.main;

        main.bgImg.src = "./assets/bg.png";
        main.bgImg.style.width = "100%";

        main.title.innerText = "Our products";
        main.title.style.fontStyle = "normal";
        main.title.style.fontWeight = "700";
        main.title.style.fontSize = "24px";
        main.title.style.lineHeight = "29px";
        main.title.style.textAlign = "center";
        main.title.style.color = "#000000";

        main.description.innerText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy tincidunt ut laoreet dolore magna aliquam erat volutpat.";
        main.description.style.fontStyle = "normal";
        main.description.style.fontWeight = "400";
        main.description.style.fontSize = "24px";
        main.description.style.lineHeight = "29px";
        main.description.style.textAlign = "center";
        main.description.style.color = "#000000";
        main.description.style.margin = "0 10rem";


        //TODO: add items here

        main.container.appendChild(main.bgImg);
        main.container.appendChild(main.title);
        main.container.appendChild(main.description);

        els.body.container.innerHTML = "";
        els.body.container.appendChild(main.container);

        // console.log("main page rendered");
    },
    createCheckout() {
        const els = App.elements;
        const { container, title, items, confirmBtn, confirmBtnContainer } = els.body.checkout;

        container.style.backgroundColor = "#E5E5E5";
        container.style.height = "100%";
        container.style.border = "1px solid #E5E5E5";

        title.innerText = "My cart [Total Amount: X]";
        title.style.padding = "230px 0 0 0";
        title.style.width = "100%";
        title.style.height = "40px";
        title.style.fontStyle = "normal";
        title.style.fontWeight = "700";
        title.style.fontSize = "24px";
        title.style.lineHeight = "29px";
        title.style.textAlign = "center";

        //TODO: add items here

        confirmBtn.innerText = "Confirm purchase";
        confirmBtn.classList.add("btn");
        confirmBtnContainer.appendChild(confirmBtn);
        confirmBtnContainer.style.textAlign = "center";

        container.appendChild(title);
        container.appendChild(confirmBtnContainer);

        els.body.container.innerHTML = "";
        els.body.container.appendChild(container);

        // console.log("checkout page rendered");

    },
    createFooter() {
        const els = App.elements;
        const footer = els.footer;

        footer.container.style.backgroundColor = "#000000";
        footer.container.style.display = "flex";
        footer.container.style.justifyContent = "center";
        footer.container.style.padding = "0";

        footer.logo.src = "./assets/logo.png";
        footer.logo.style.margin = "35px 0px 35px 48px";



        footer.container.appendChild(footer.logo);
        els.root.appendChild(footer.container);
    },
    createLayout() {
        const els = App.elements;

        els.root.style.height = "100vh";
        els.root.style.display = "flex";
        els.root.style.flexDirection = "column";
        els.body.container.style.flexGrow = "1";

        this.createHeader();

        els.root.appendChild(els.body.container);

        this.createFooter();
    },
    getPage() {
        let searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get("p");
        return page;
    },
    router() {
        setInterval(() => {
            const page = this.getPage();
            // console.log("page:", page);
            if (page == "cart") {
                // console.log("rendering checkout");
                this.createCheckout();
            } else if (!page) {
                // console.log("rendering main");
                this.createMain();
            } else {
                //error page
            }
        }, 100);

    },
    go(p, url) {
        if (p === "cart") {
            history.pushState({ p }, "", App.state.routes[p]);
        } else {
            history.pushState({ p }, "", App.state.routes[p]);
        }

    }
}