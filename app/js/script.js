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

//////// Help Form //////////

const  helpForm = document.getElementById("helpForm");
helpForm.addEventListener("submit", formSend);

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /(\+38)?\(?0(39|67|68|96|50|66|95|99|63|93|91|92|94)\)?\-?(\d{3})\-?(\d{2})\-?(\d{2})/g;

async function formSend (e) {
    e.preventDefault();

    let error = formValidate(helpForm);
    let formDate = new FormData(helpForm);
    const url = "http://mail.api.mildhills.org/help/request";

    if (error === 0 ) {
        let response = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "telegram": formDate.get("telegram"),
                "phone": formDate.get("phone"),
                "email": formDate.get("email"),
                "name": formDate.get("name"),
                "requestType": formDate.get("type"),
            }
        });
        let result = await response.json();
        console.log(result);
    }
}

function formValidate (helpForm) {
    let error = 0;
    let formReq = document.querySelectorAll(".req");

    for( index = 0; index < formReq.length; index++) {
        let input = formReq[index];
        deleteClass([input], "error");

        if (input.getAttribute("name") === "email") {
            if(!isEmailValid(input)){
                addClass([input], "error");
                error++;
            }
        } else if (input.getAttribute("name") === "phone") {
            if(!isPhoneValid(input)){
                addClass([input], "error");
                error++;
            }
        } else if (input.value === '') {
            addClass([input], "error");
            error++;
        }
    }
    return error;
}

function isEmailValid(input) {
    return EMAIL_REGEXP.test(input.value);
}
function isPhoneValid(input) {
    return PHONE_REGEXP.test(input.value);
}


