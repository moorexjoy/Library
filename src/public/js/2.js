/**
 * waits the given amount of time and them resolves the promise
 * @param {number} ms the length of time to wait in millisenconds
 * @returns {Promise.<any>} a promise that resolves when we're done waiting
 */
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

/**
 * @returns {number} a random normal variable
 */
function randomNormal() {
    let u = 0;
    while (u === 0) {
        u = Math.random();
    };
    let v = 0;
    while (v === 0) {
        v = Math.random();
    };
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

/**
 * writes the given text to the element over time
 * @param {HTMLElement} element the element to animate
 * @param {string} text the text to write
 * @param {number} typingDelay average milliseconds between characters
 * @returns {Promise.<any>} a promise which resolves when we're done animating
 */
async function animateElement(element, text, typingDelay) {
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === " ") {
            while (text.length > i + 1 && text.charAt(i + 1) === " ") {
                i++;
            }
        }
        element.textContent = text.substring(0, i + 1);
        await sleep(typingDelay + randomNormal() * typingDelay * 0.1);
    }
};

/**
 * animates the children of the given element in order. in particular, this
 * stores and removes the text contents of all the immediate children and
 * then removes the text-animated class then writes the text back to them slowly
 * @param {HTMLElement} element the root element to animate 
 * @param {number} typingDelay average milliseconds between characters
 * @returns {Promise.<any>} a promise which resolves when we're done animating
 */
async function animateRoot(element, typingDelay) {
    /**
     * @type {Array.<string>}
     */
    const childrenText = [];
    for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        childrenText.push(child.textContent);
        child.textContent = "";
    };
    element.classList.remove("text-animated");
    for (let i = 0; i < element.children.length; i++) {
        await animateElement(element.children[i], childrenText[i], typingDelay);
    }
};

function onDocumentLoaded() {
    const root = document.getElementsByClassName("text-animated")[0];
    animateRoot(root, 30);
};

onDocumentLoaded();
