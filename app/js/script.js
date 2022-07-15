function toggleMenu () {
    const menuButton = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLogo = document.querySelector(".mobile-header .logo-block");
    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    mobileLogo.classList.toggle("active");
}

function openBank () {
    const donatForm = document.querySelector(".donat-form");
    const remittance = document.querySelector(".remittance");
    const remittanceButton = document.querySelector(".remittance-button");
    const bunkButton = document.querySelector(".bank-button");
    donatForm.classList.add("active");
    remittance.classList.remove("active");
    bunkButton.classList.add("active");
    remittanceButton.classList.remove("active");
}

function openRemittance () {
    const donatForm = document.querySelector(".donat-form");
    const remittance = document.querySelector(".remittance");
    const remittanceButton = document.querySelector(".remittance-button");
    const bunkButton = document.querySelector(".bank-button");
    donatForm.classList.remove("active");
    remittance.classList.add("active");
    bunkButton.classList.remove("active");
    remittanceButton.classList.add("active");
}

