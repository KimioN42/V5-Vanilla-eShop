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
            this.go("home");
        }

        header.cartIcon.src = "./assets/cart.png";
        header.cartIcon.style.width = "36px";
        header.cartIcon.style.height = "36px";
        header.cartIcon.style.cursor = "pointer";
        header.cartIcon.onclick = () => {
            if (App.state.mutations.isLoggedIn()) {
                console.log("rendering cart");
                this.go("cart");
            } else {
                window.alert("You must be logged in to view your cart");
            }
        }

        header.cartCount.innerText = App.state.mutations.getCartCount();
        // header.cartCount.style.border = "1px solid #e5e5e5";
        header.cartCount.style.color = "white";
        header.profileIcon.style.marginLeft = "2rem";
        header.profileIcon.style.width = "36px";
        header.profileIcon.style.cursor = "pointer";
        this.updateProfileIcon();

        // header.cartContainer.style.border = "1px solid #e5e5e5";
        header.cartContainer.style.display = "flex";
        header.cartContainer.style.alignItems = "center";
        header.cartContainer.style.margin = "0 53px 0 0";


        header.cartContainer.appendChild(header.cartIcon);
        header.cartContainer.appendChild(header.cartCount);
        header.cartContainer.appendChild(header.profileIcon);



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
        // console.log("adding items");
        main.itemsContainer.style.display = "flex";
        main.itemsContainer.style.flexWrap = "wrap";
        main.itemsContainer.style.justifyContent = "center";
        main.itemsContainer.style.marginTop = "2rem";

        this.createItemsElements(main.itemsContainer);

        main.container.style.marginBottom = "10rem";

        main.container.appendChild(main.bgImg);
        main.container.appendChild(main.title);
        main.container.appendChild(main.description);
        main.container.appendChild(main.itemsContainer);

        this.updateBody(main.container);

        // console.log("main page rendered");
    },
    createItemsElements(container) {
        container.innerHTML = "";
        App.state.products.forEach(product => {
            const card = this.createCard(
                product.images,
                product.name,
                product.price,
                product.desc,
                "Add to cart",
                () => {
                    // console.log("card clicked");
                    if (App.state.mutations.isLoggedIn()) {
                        const userConfirmation = confirm("Do you want to add this product to your cart?");
                        if (userConfirmation) {
                            window.alert(App.state.mutations.addToCart(product));
                            //updates cart to local storage
                            this.saveCartToLocalStorage();
                            this.updateCartCount();
                        }
                    } else {
                        window.alert("You must be logged in to add items to your cart");
                    }
                }
            );
            card.style.margin = "1rem";
            container.appendChild(card);
        });


    },
    createCartElements(container) {
        container.innerHTML = "";
        App.state.cart.forEach(product => {
            const card = this.createCard(
                product.images,
                product.name,
                product.price,
                product.desc,
                "Remove from cart",
                () => {
                    // console.log("card clicked");
                    const userConfirmation = confirm("Do you want to remove this product to your cart?");
                    if (userConfirmation) {
                        window.alert(App.state.mutations.removeFromCart(product));
                        this.updateCartCount();
                        localStorage.setItem(App.state.keys[0], JSON.stringify(App.state.cart));
                        //updates the cart in local storage
                        this.saveCartToLocalStorage();
                        this.createCheckout();
                    }
                }
            );
            card.style.margin = "1rem";
            container.appendChild(card);
        });
    },
    updateCartCount() {
        const els = App.elements;
        const header = els.header;

        // header.cartCount.style.border = "1px solid red";

        header.cartCount.innerText = App.state.mutations.getCartCount();

    },
    updateProfileIcon() {
        const header = App.elements.header;
        if (App.state.mutations.isLoggedIn()) {
            header.profileIcon.src = "./assets/profile-logged.svg";
            header.profileIcon.onclick = () => {
                console.log("profile login clicked");
                this.go("profile");
            }
        } else {
            header.profileIcon.src = "./assets/profile-signin.svg";
            header.profileIcon.onclick = () => {
                console.log("profile login clicked");
                this.go("login");
            }
        }
    },
    updateBalance() {
        const balance = App.elements.body.profile.currentBalance;
        balance.innerText = `Your current balance is: $${App.state.mutations.getUserBalance()}`;
        balance.style.padding = "1rem";
        balance.style.margin = "1rem";
    },
    createProfile() {
        const body = App.elements.body;
        const profile = body.profile;
        const user = App.state.mutations.getLoggedInUser();

        profile.container.innerHTML = "";
        profile.currentBalance.innerHTML = "";
        profile.addBalance.innerHTML = "";

        if (App.state.mutations.isLoggedIn()) {
            //User name info
            profile.title.innerText = `Hello,  ${user.name}!`;
            profile.title.style.padding = "230px 0 0 0";

            //Current balance info
            this.updateBalance();

            //Adding balance
            const add = document.createElement("p");
            add.innerText = "Add balance: ";
            profile.addBalance.appendChild(add);
            const oneDollar = this.createBtn("$1", "primary", () => {
                App.state.mutations.updateBalance(1);
                this.updateBalance();
            });
            const fiveDollar = this.createBtn("$5", "primary", () => {
                App.state.mutations.updateBalance(5);
                this.updateBalance();
            });
            const tenDollar = this.createBtn("$10", "primary", () => {
                App.state.mutations.updateBalance(10);
                this.updateBalance();
            });
            profile.addBalance.appendChild(add);
            profile.addBalance.appendChild(oneDollar);
            profile.addBalance.appendChild(fiveDollar);
            profile.addBalance.appendChild(tenDollar);

            profile.addBalance.style.display = "flex";
            // profile.addBalance.style.padding = "1rem";
            profile.addBalance.style.margin = "1rem";
            profile.addBalance.style.justifyContent = "center";
            profile.addBalance.style.alignItems = "center";
            // profile.addBalance.style.justifyContent = "space-between";

            //Logout button
            profile.logoutBtn = this.createBtn(
                "Logout",
                "secondary",
                () => {
                    localStorage.removeItem(App.state.keys[1]);
                    localStorage.removeItem(App.state.keys[2]);
                    this.go("logout");
                });
            profile.logoutBtn.style.margin = "auto";
            profile.logoutBtn.style.padding = "1rem";
            profile.logoutBtn.style.cursor = "pointer";

            //container styling and appends
            profile.container.style.textAlign = "center";


        } else {
            profile.title.innerText = "You are not logged in";
            profile.title.style.padding = "230px 0 0 0";
            profile.container.style.textAlign = "center";
            profile.logoutBtn = this.createBtn("Login", "secondary", () => {
                this.go("login");
            });
            profile.logoutBtn.style.margin = "auto";
        }

        profile.container.appendChild(profile.title);
        profile.container.appendChild(profile.currentBalance);
        profile.container.appendChild(profile.addBalance);
        profile.container.appendChild(profile.logoutBtn);
        this.updateBody(profile.container);
    },
    logout() {
        if (App.state.mutations.logoutUser()) {
            localStorage.removeItem(App.state.keys[0]);
            localStorage.removeItem(App.state.keys[1]);
            localStorage.removeItem(App.state.keys[2]);
            this.updateProfileIcon();
            this.go("login");
            App.elements.body.container.innerHTML = "";
            this.createLoginSignUp(true);
        } else {
            window.alert("Something went wrong when logging out");
        }
    },
    createCheckout() {
        const els = App.elements;
        const { container, title, balance, items, confirmBtn, confirmBtnContainer, itemsContainer } =
            els.body.checkout;

        container.style.backgroundColor = "#E5E5E5";
        container.style.height = "100%";
        container.style.border = "1px solid #E5E5E5";

        // title.innerText = "My cart [Total Amount: " + this.formatCurrency(App.state.mutations.getCartTotal()) + "]";
        title.innerText = `My cart [Total Amount:  ${this.formatCurrency(App.state.mutations.getCartTotal())} ]`;
        title.style.padding = "230px 0 0 0";
        title.style.width = "100%";
        title.style.height = "40px";
        title.style.fontStyle = "normal";
        title.style.fontWeight = "700";
        title.style.fontSize = "24px";
        title.style.lineHeight = "29px";
        title.style.textAlign = "center";

        balance.innerText = `Your current balance is: $${App.state.mutations.getUserBalance()}`;
        balance.style.padding = "1rem";
        balance.style.margin = "1rem";
        balance.style.textAlign = "center";


        //TODO: add items here
        itemsContainer.style.display = "flex";
        itemsContainer.style.flexWrap = "wrap";
        itemsContainer.style.justifyContent = "center";
        itemsContainer.style.marginBottom = "5rem";
        this.createCartElements(itemsContainer);

        confirmBtn.innerText = "Confirm purchase";
        confirmBtn.classList.add("btn");
        confirmBtn.onclick = () => {
            this.confirmPurchase();
        };
        confirmBtnContainer.style.textAlign = "center";
        confirmBtnContainer.appendChild(confirmBtn);

        container.style.marginBottom = "10rem";

        container.appendChild(title);
        container.appendChild(balance);
        container.appendChild(itemsContainer);
        container.appendChild(confirmBtnContainer);

        els.body.container.innerHTML = "";
        els.body.container.appendChild(container);
        // console.log("checkout page rendered");

    },
    confirmPurchase() {
        // console.log("confirm purchase");
        if (App.state.mutations.getCartCount() > 0) {
            const userRes = confirm("Do you want to confirm your purchase?");
            if (userRes) {
                if (App.state.mutations.getUserBalance() >= App.state.mutations.getCartTotal()) {
                    window.alert("Your purchase has been confirmed");
                    App.state.mutations.updateBalance(-App.state.mutations.getCartTotal());
                    App.state.mutations.clearCart();
                    this.updateCartCount();
                    localStorage.removeItem(App.state.keys[0]);
                    this.go("home");
                } else {
                    window.alert("You don't have enough balance to complete this purchase");
                }
            } else {
                window.alert("Your purchase has been cancelled");
            }
        } else {
            window.alert("Your cart is empty");
        }
    },
    createFooter() {
        const els = App.elements;
        const footer = els.footer;

        footer.container.style.backgroundColor = "#000000";
        footer.container.style.display = "flex";
        footer.container.style.justifyContent = "center";
        footer.container.style.padding = "0";
        // footer.container.style.marginTop = "125px";

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
    createLoginSignUp(loginScreen) {
        const body = App.elements.body;
        const login = App.elements.body.login;

        login.container.innerHTML = "";
        login.loginForm.innerHTML = "";

        if (loginScreen) {
            login.title.innerHTML = "Login";
        } else {
            login.title.innerHTML = "Sign up";
        }
        login.title.style.fontSize = "24px";
        login.title.style.padding = "230px 0 0 0";

        const usernameField = this.createInput("text", "Username", true);
        const passwordField = this.createInput("password", "Password", true);

        login.loginForm.style.display = "flex";
        login.loginForm.style.flexDirection = "column";
        login.loginForm.style.margin = "1rem";
        login.loginForm.style.alignItems = "center";

        const loginBtn = this.createBtn("Login", "primary", () => {
            //TODO: login logic
            const user = {
                "name": usernameField.value,
                "password": passwordField.value
            }
            if (App.state.mutations.loginUser(user)) {
                this.updateProfileIcon();
                this.createMain();
                localStorage.setItem(App.state.keys[1], JSON.stringify(App.state.loggedInUser));
                localStorage.setItem(App.state.keys[2], App.state.mutations.isLoggedIn());
                localStorage.setItem(App.state.keys[3], JSON.stringify(App.state.mutations.getUsers()));
                console.log("status in local storage: " + localStorage.getItem(App.state.keys[2]));
                console.log("User logged in:" + user.name);
                this.go("home");
            } else {
                window.alert("Invalid username or password");
            }
        });
        loginBtn.style.margin = "1rem";
        loginBtn.style.cursor = "pointer";

        const signUpBtn = this.createBtn("Sign up", "primary", () => {
            //TODO sign up logic
            const user = {
                "name": usernameField.value,
                "password": passwordField.value,
                "balance": 0
            };


            if (App.state.mutations.addUser(user)) {
                window.alert("User created successfully");
                localStorage.setItem(App.state.keys[3], JSON.stringify(App.state.users));
                this.go("login");
                // console.log(App.state.mutations.getUsers());
            } else {
                window.alert("Username already exists");
            }


        });
        signUpBtn.style.margin = "1rem";
        signUpBtn.style.cursor = "pointer";


        const signup = document.createElement("p");
        signup.innerText = "Don't have an account? Sign up";
        signup.style.fontSize = "14px";
        signup.style.cursor = "pointer";
        signup.onclick = () => {
            this.go("signup");
        }


        login.loginForm.appendChild(usernameField);
        login.loginForm.appendChild(passwordField);
        if (loginScreen) {
            login.loginForm.appendChild(loginBtn);
            login.loginForm.appendChild(signup);
        } else {
            login.loginForm.appendChild(signUpBtn);
        }


        login.container.style.textAlign = "center";


        login.container.appendChild(login.title);
        login.container.appendChild(login.loginForm);

        this.updateBody(login.container);
    },
    createInput(type, placeholder, required) {
        const el = document.createElement("input");
        el.type = type;
        el.placeholder = placeholder;
        el.required = required;
        el.style.borderRadius = "5px";
        el.style.border = "1px solid #E5E5E5";
        el.style.padding = "10px";
        el.style.margin = "0.5rem";
        return el;
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
            if (!page) {
                // console.log("rendering main");
                this.createMain();
            } else if (page == "cart") {
                // console.log("rendering checkout");
                this.createCheckout();
            } else if (page == "signup") {
                this.createLoginSignUp(false);
            } else if (page == "login") {
                this.createLoginSignUp(true);
            } else if (page == "profile") {
                this.createProfile();
            } else if (page == "logout") {
                this.logout();
            } else {
                //error page
                this.createErrorPage();
            }
            App.state.routeRendered = true;
        }, 100);

    },
    go(p) {
        App.state.routeRendered = false;
        history.pushState({ p }, "", App.state.routes[p]);
        // if (p === "cart") {
        //     history.pushState({ p }, "", App.state.routes[p]);
        // } else {
        //     history.pushState({ p }, "", App.state.routes[p]);
        // }

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
    createCard(imgSrc, titleText, priceText, descriptionText, btnLabel, onClick) {
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
        const btn = this.createBtn(btnLabel, "primary", onClick);
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
    saveCartToLocalStorage() {
        const cartData = JSON.stringify(App.state.cart);
        //cart data
        localStorage.setItem(App.state.keys[0], cartData);
    },
    loadLocalStorage() {
        //gets cart data from local storage and sets it to the cart state
        const cartData = localStorage.getItem(App.state.keys[0]);
        if (cartData) {
            App.state.mutations.setCart(JSON.parse(cartData));
        }
        //gets user data from local storage and sets it to the logged in user state
        const userData = localStorage.getItem(App.state.keys[1]);
        if (userData) {
            App.state.mutations.setLoggedInUser(JSON.parse(userData));
        }
        //gets logged in state from local storage and sets it to the logged in state
        const loginData = localStorage.getItem(App.state.keys[2]);
        // console.log("login data retrieved is: ", loginData);
        App.state.mutations.setLoggedIn(loginData === "true");
        //gets users data from local storage and sets it to the users state
        const usersData = localStorage.getItem(App.state.keys[3]);
        if (usersData) {
            App.state.mutations.setUsers(JSON.parse(usersData));
        }
    },
}
