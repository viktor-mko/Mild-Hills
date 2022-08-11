const donatForm = document.querySelector(".donate-form");
const remittance = document.querySelector(".remittance");
const remittanceButton = document.querySelector(".remittance-button");
const bunkButton = document.querySelector(".bank-button");

function toggleMenu() {
    const menuButton = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLogo = document.querySelector(".mobile-header .logo-block");
    const mobileHeader = document.querySelector("header");
    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    mobileLogo.classList.toggle("active");
    mobileHeader.classList.toggle("menu-active");
}

function openBank() {
    donatForm.classList.add("active");
    remittance.classList.remove("active");
    bunkButton.classList.add("active");
    remittanceButton.classList.remove("active");
}

function openRemittance() {
    donatForm.classList.remove("active");
    remittance.classList.add("active");
    bunkButton.classList.remove("active");
    remittanceButton.classList.add("active");
}

function changeLanguage() {
    const ua = document.querySelectorAll(".ua");
    const en = document.querySelectorAll(".en");
    const language = this.getAttribute("key");
    if (language === "ua") {
        ua.forEach(element => element.classList.add("active"));
        en.forEach(element => element.classList.remove("active"));
    } else {
        ua.forEach(element => element.classList.remove("active"));
        en.forEach(element => element.classList.add("active"));
    }
    const multilingual = document.querySelectorAll(".multilingual");
    multilingual.forEach(
        (element) => {
            if (element.classList.contains('input')) {
                element.setAttribute("placeholder", arrLang[language][element.getAttribute('key')])
            } else {
                element.innerHTML = (arrLang[language][element.getAttribute('key')])
            }
        }
    )
};

const language = document.querySelectorAll(".translate");

language.forEach(item=>{
    item.addEventListener('click', changeLanguage);
});


//// Fondy  ////


//// Help Form ////
