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

        header.cartIcon.src = "./assets/cart.png";
        header.cartIcon.style.width = "36px";
        header.cartIcon.style.height = "36px";
        header.cartIcon.style.margin = "0 53px 0 0";
        header.cartIcon.style.cursor = "pointer";
        header.cartIcon.onclick = () => {
            console.log("cart clicked");
        }

        header.container.appendChild(header.logo);
        header.container.appendChild(header.cartIcon);
        els.root.appendChild(header.container);
    },
    createBody() {
        const els = App.elements;
        const body = els.body;

        body.container.style.flexGrow = "1";

        body.bgImg.src = "./assets/bg.png";
        body.bgImg.style.width = "100%";

        body.title.innerText = "Our products";
        body.title.style.fontStyle = "normal";
        body.title.style.fontWeight = "700";
        body.title.style.fontSize = "24px";
        body.title.style.lineHeight = "29px";
        body.title.style.textAlign = "center";
        body.title.style.color = "#000000";

        body.description.innerText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy tincidunt ut laoreet dolore magna aliquam erat volutpat.";
        body.description.style.fontStyle = "normal";
        body.description.style.fontWeight = "400";
        body.description.style.fontSize = "24px";
        body.description.style.lineHeight = "29px";
        body.description.style.textAlign = "center";
        body.description.style.color = "#000000";
        body.description.style.margin = "0 248px 0 248px";



        body.container.appendChild(body.bgImg);
        body.container.appendChild(body.title);
        body.container.appendChild(body.description);


        els.root.appendChild(body.container);
    },
    createFooter() {
        const els = App.elements;
        const footer = els.footer;

        footer.container.style.backgroundColor = "#000000";
        footer.container.style.display = "flex";
        footer.container.style.justifyContent = "center";
        footer.container.style.padding = "50px";

        footer.logo.src = "./assets/logo.png";
        footer.logo.style.margin = "35px 0px 35px 48px";



        footer.container.appendChild(footer.logo);
        els.root.appendChild(footer.container);
    },
    createLayout() {
        const els = App.elements;

        els.root.style.height = "100vh";
        // els.root.style.border = "1px solid green";
        els.root.style.display = "flex";
        els.root.style.flexDirection = "column";



        this.createHeader();
        this.createBody();
        this.createFooter();
    }



}