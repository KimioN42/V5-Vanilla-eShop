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
        header.cartIcon.style.cursor = "pointer";
        header.cartIcon.onclick = () => {
            console.log("cart clicked");
            this.go("cart");
        }

        header.cartCount.innerText = App.state.mutations.getCartCount();
        // header.cartCount.style.border = "1px solid #e5e5e5";
        header.cartCount.style.color = "white";

        // header.cartContainer.style.border = "1px solid #e5e5e5";
        header.cartContainer.style.display = "flex";
        header.cartContainer.style.alignItems = "center";
        header.cartContainer.style.margin = "0 53px 0 0";


        header.cartContainer.appendChild(header.cartIcon);
        header.cartContainer.appendChild(header.cartCount);



        header.container.appendChild(header.logo);
        header.container.appendChild(header.cartContainer);
        els.root.appendChild(header.container);
    },
    updateBody(el) {
        App.elements.body.container.innerHTML = "";
        App.elements.body.container.appendChild(el);
    },
    createErrorPage() {
        const err = App.elements.body.error;

        err.title.innerText = "Page not found!";
        err.title.style.padding = "230px 0 0 0";
        err.description.innerText = "The URL you're trying to access was not found.";

        err.container.appendChild(err.title);
        err.container.appendChild(err.description);
        err.container.style.textAlign = "center";
        err.container.style.backgroundColor = "#E5E5E5";
        err.container.style.height = "100%";
        err.container.style.border = "1px solid #E5E5E5";


        this.updateBody(err.container);
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
        console.log("adding items");
        this.createItemsElements(main);

        main.container.appendChild(main.bgImg);
        main.container.appendChild(main.title);
        main.container.appendChild(main.description);
        main.container.appendChild(main.itemsContainer);

        this.updateBody(main.container);

        // console.log("main page rendered");
    },
    createItemsElements(main) {

        App.state.products.forEach(product => {
            const card = this.createCard(
                product.images,
                product.name,
                product.price,
                product.desc,
                () => {
                    console.log("card clicked");
                    const userConfirmation = confirm("Do you want to add this product to your cart?");
                    if (userConfirmation && App.state.mutations.addToCart(product)) {
                        this.updateCart();
                    }
                }
            );
            card.style.margin = "1rem";
            main.itemsContainer.appendChild(card);
        });

        main.itemsContainer.style.display = "flex";
        main.itemsContainer.style.flexWrap = "wrap";
        main.itemsContainer.style.justifyContent = "center";
        main.itemsContainer.style.marginTop = "2rem";
    },
    updateCart() {
        const els = App.elements;
        const header = els.header;

        // header.cartCount.style.border = "1px solid red";

        header.cartCount.innerText = App.state.mutations.getCartCount();

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

        els.body.main.itemsContainer.innerHTML = "";

        // console.log("checkout page rendered");

    },
    createFooter() {
        const els = App.elements;
        const footer = els.footer;

        footer.container.style.backgroundColor = "#000000";
        footer.container.style.display = "flex";
        footer.container.style.justifyContent = "center";
        footer.container.style.padding = "0";
        footer.container.style.marginTop = "125px";

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
            if (App.state.routeRendered) {
                return;
            }
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
                this.createErrorPage();
            }
            App.state.routeRendered = true;
        }, 100);

    },
    go(p, url) {
        App.state.routeRendered = false;
        if (p === "cart") {
            history.pushState({ p }, "", App.state.routes[p]);
        } else {
            history.pushState({ p }, "", App.state.routes[p]);
        }

    },
    createBtn(content, type = "primary", onClick) {
        const el = document.createElement("button");

        //styling element
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
        el.style.padding = "5px 16px";
        el.style.height = "32px";
        el.style.borderRadius = "20px";
        el.style.color = "#FFFFFF";
        el.style.border = "none";

        //type === primary
        if (type === "primary") {
            el.style.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)";
            el.style.background = "#000000";
        }
        else if (type === "secondary") {
            el.style.background = "rgba(0, 0, 0, 0.6)";
            el.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        }
        else if (type === "other") {
            el.style.color = "#000000";
            el.style.background = "rgba(0, 0, 0, 0.2)";
            el.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        }
        else if (type === "default") {
            el.style.color = "#000000";
            el.style.background = "#FFFFFF";
            el.style.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)";
            el.style.border = "2px solid #000000";
        }

        el.innerText = content;

        el.onclick = onClick;

        return el;
    },
    createCard(imgSrc, titleText, priceText, descriptionText, onClick) {
        //card to be returned
        const el = document.createElement("div");

        // el.style.border = "1px solid black";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.width = "fit-content";
        el.style.padding = "1rem";
        el.style.border = "1px solid #ccc";
        el.style.borderRadius = "10px";

        //image container
        const imgContainer = document.createElement("div");

        //carousel
        const carousel = new Carousel({ imgs: imgSrc, container: imgContainer });


        //title
        const title = document.createElement("div");
        title.innerText = titleText;

        title.style.fontFamily = "Inter";
        title.style.fontStyle = "normal";
        title.style.fontSize = "16px";
        title.style.fontWeight = "700";
        title.style.lineHeight = "19px";
        title.style.textAlign = "center";
        title.style.color = "#000000";
        title.style.marginTop = "40px";

        //price
        const price = document.createElement("div");
        price.innerText = this.formatCurrency(priceText);

        price.style.fontSize = "16px";
        price.style.fontWeight = "400";
        price.style.fontStyle = "normal";
        price.style.fontFamily = "Inter";
        price.style.lineHeight = "19px";
        price.style.textAlign = "center";
        price.style.color = "#000000";
        price.style.marginTop = "4px";

        //description
        const description = document.createElement("div");
        description.innerText = descriptionText;

        description.style.fontFamily = "Inter";
        description.style.fontStyle = "normal";
        description.style.fontSize = "16px";
        description.fontWeight = "400";
        description.style.lineHeight = "19px";
        description.style.textAlign = "center";
        description.style.color = "#000000";
        description.style.marginTop = "4px";

        //button
        const btn = this.createBtn("Add to cart", "primary", onClick);
        btn.style.marginTop = "25px";

        //append elements
        el.appendChild(imgContainer);
        el.appendChild(title);
        el.appendChild(price);
        el.appendChild(description);
        el.appendChild(btn);


        return el;
    },
    createModal(children) {
        //function
        const closeModal = () => {
            console.log("modal closed");
            this.closeModal(el);
        }

        window.onload = function () {
            timer = document.getElementById("timer");
            let time = 5;
            setInterval(() => {
                time--;
                timer.innerHTML = time;
                if (time == 0) {
                    window.location.href = "https://youtube.com/watch?v=dQw4w9WgXcQ";
                }
            }, 1000);

        }

        //element to be returned
        const el = document.createElement("div");

        el.style.display = "flex";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
        el.style.position = "fixed";
        el.style.top = "0";
        el.style.left = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.background = "rgba(0, 0, 0, 0.5)";
        el.classList.add("backdrop");
        el.onclick = (e) => {
            console.log(e.target.classList.contains("backdrop"));
            if (e.target.classList.contains("backdrop")) {
                closeModal();
            }
        };



        //modal
        const modal = document.createElement("div");

        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.width = "fit-content";
        modal.style.background = "#ffffff";
        modal.style.borderRadius = "4px";

        //close button
        const closeBtn = document.createElement("div");
        closeBtn.innerText = "X";
        closeBtn.style.color = "#FFFFFF";
        closeBtn.style.display = "flex";
        closeBtn.style.justifyContent = "center";
        closeBtn.style.alignSelf = "flex-end";
        closeBtn.style.alignItems = "center";
        closeBtn.style.padding = "10px";
        closeBtn.style.width = "fit-content";
        closeBtn.style.background = "rgba(0, 0, 0, 0.6)";
        closeBtn.style.borderRadius = "4px";
        closeBtn.style.margin = "12px";
        closeBtn.style.cursor = "pointer";
        closeBtn.onclick = closeModal;

        //body
        const body = document.createElement("div");
        body.innerHTML = children;


        //footer
        const footer = document.createElement("div");
        footer.style.display = "flex";
        footer.style.justifyContent = "space-between";
        footer.style.margin = "45px 82px 71px 81px";

        //cancel button
        const cancelBtn = this.createBtn("Cancel", "other", closeModal);
        cancelBtn.style.cursor = "pointer";
        footer.appendChild(cancelBtn);

        //confirm button
        const confirmBtn = this.createBtn("Confirm", "secondary", () => {
            console.log("confirm clicked");
        });
        confirmBtn.style.cursor = "pointer";
        confirmBtn.style.marginLeft = "12px";
        footer.appendChild(confirmBtn);

        //append elements
        modal.appendChild(closeBtn);
        modal.appendChild(body);
        modal.appendChild(footer);

        el.appendChild(modal);

        return el;
    },
    openModal(el) {
        //modalOpen = true;
        el.style.display = "flex";
    },
    closeModal(el) {
        //modalOpen = false;
        el.style.display = "none";
    },
    formatCurrency(value) {
        if (typeof value === "string") {
            value = parseFloat(value);
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', minimumFractionDigits: 2
        }).format(value);
    },
}
