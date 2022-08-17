const donatForm = document.querySelector(".donate-form");
const remittance = document.querySelector(".remittance");
const remittanceButton = document.querySelector(".remittance-button");
const bunkButton = document.querySelector(".bank-button");

function toggleMenu () {
    const menuButton = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLogo = document.querySelector(".mobile-header .logo-block");
    const mobileHeader = document.querySelector("header");
    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    mobileLogo.classList.toggle("active");
    mobileHeader.classList.toggle("menu-active");
}

function deleteClass (elements, className) {
    elements.forEach(element => element.classList.remove(className));
}

function addClass (elements, className) {
    elements.forEach(element => element.classList.add(className));
}

function openBank () {
    addClass([donatForm, bunkButton],"active");
    deleteClass([remittance, remittanceButton], "active")
}

function openRemittance () {
    addClass([remittance, remittanceButton],"active");
    deleteClass([donatForm, bunkButton], "active")
}

////////Toggle Language //////////

function changeLanguage () {
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

////////Toggle Сurrency //////////

function changeCurrency () {
    const corrBank2 = document.querySelectorAll(".corr-bank-2");
    const currencyType = this.getAttribute("id");

    if (currencyType === "plCurrency" || currencyType === "gbCurrency") {
        corrBank2.forEach(element => element.style.display = 'none');
    } else {
        corrBank2.forEach(element => element.style.display = 'flex');
    }

    const multilCurrency = document.querySelectorAll(".multi-currency");
    multilCurrency.forEach(
        (element) => {
            element.innerHTML = (arrCurrency[currencyType][element.getAttribute('key')])
        }
    )
};

const currency = document.querySelectorAll(".currency");

currency.forEach(item=>{
    item.addEventListener('click', changeCurrency);
});


////////Donate //////////

function getValue () {
    const donateValue = document.querySelectorAll('.donate-count-block input');
    let result;
    donateValue.forEach(function (elem) {
        if (elem.checked) {
            const value = elem.value;
            result = (value === 'other') ? '': value;
        }
    });
    return result;
}

function donate () {

    const donateValue = getValue();
    const payerName = document.getElementById("donate-name").value;
    const payerEmail = document.getElementById("donate-email").value;
    const payerPhone = document.getElementById("donate-phone").value;

    const button = $ipsp.get('button');
    button.setMerchantId(1506333);
    button.setAmount(donateValue, 'UAH');
    button.setHost('pay.fondy.eu');

    button.addField({
        label: "Ваше ім'я",
        name: 'name',
        value: payerName,
        required: false
    });
    button.addField({
        label: 'Ваша електронна пошта',
        name: 'email',
        value: payerEmail,
        required: false
    });
    button.addField({
        label: 'Ваш телефон',
        name: 'phone',
        value: payerPhone,
        required: false
    });

    setTimeout(function(){location.href=button.getUrl()},0)
};
