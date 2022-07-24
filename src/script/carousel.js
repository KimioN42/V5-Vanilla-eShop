class Carousel {
    config = {};

    container = null;
    leftContainer = null;
    imageContainer = null;
    rightContainer = null;

    imgEls = [];
    currentImgIndex = 0;

    /**
    * Configuring the carousel
    * @param {Object} config
    * @param {HTMLElement} config.container The container where the carousel will be displayed
    * @param {Array} config.imgs List of images to be displayed
    */
    constructor(config) {
        // console.log("starting carousel", this);
        this.config = config;
        this.container = config.container;

        this.setContainerStyle();
        this.createCarets();
        this.preloadImages();
        this.renderImg();

        // console.log("finishing carousel");
    }

    renderImg() {
        this.imageContainer.innerHTML = "";
        this.imageContainer.appendChild(this.imgEls[this.currentImgIndex]);
    }

    setContainerStyle() {
        this.container.style.display = "flex";
        this.container.style.alignItems = "center";
        this.container.style.border = "1px solid #e5e5e5";
        this.container.style.borderRadius = "10px";
        this.container.style.width = "fit-content";
        // this.container.style.height = "300px";
    }

    preloadImages() {
        this.config.imgs.forEach((img, i) => {
            // console.log("preloading image:", img);
            const el = document.createElement("img");

            el.src = this.config.imgs[i];
            el.style.width = "300px";
            el.style.height = "300px";
            el.style.borderRadius = "50%";
            el.style.border = "1px solid black";
            el.style.margin = "1px";

            this.imgEls.push(el);
        });
    }

    createCarets() {
        this.leftContainer = document.createElement("div");
        this.imageContainer = document.createElement("div");
        this.rightContainer = document.createElement("div");

        const leftCaret = document.createElement("img");
        leftCaret.src = "./assets/caret.svg";
        leftCaret.style.transform = "rotate(270deg)";
        leftCaret.style.width = "32px";

        this.leftContainer.appendChild(leftCaret);
        this.leftContainer.style.cursor = "pointer";
        this.leftContainer.onclick = () => {
            this.currentImgIndex--;
            if (this.currentImgIndex < 0) {
                this.currentImgIndex = this.imgEls.length - 1;
            }
            this.renderImg();
            // console.log(this.currentImgIndex);
        }


        const rightCaret = document.createElement("img");
        rightCaret.src = "./assets/caret.svg";
        rightCaret.style.transform = "rotate(90deg)";
        rightCaret.style.width = "32px";

        this.rightContainer.appendChild(rightCaret);
        this.rightContainer.style.cursor = "pointer";
        this.rightContainer.onclick = () => {
            this.currentImgIndex++;
            if (this.currentImgIndex >= this.imgEls.length) {
                this.currentImgIndex = 0;
            }
            this.renderImg();
            // console.log(this.currentImgIndex);
        }


        // this.leftContainer.style.border = "1px solid green";
        // this.rightContainer.style.border = "1px solid blue";
        // this.imageContainer.style.border = "1px solid red";

        this.imageContainer.style.margin = "3px";

        this.container.appendChild(this.leftContainer);
        this.container.appendChild(this.imageContainer);
        this.container.appendChild(this.rightContainer);

    }

}
