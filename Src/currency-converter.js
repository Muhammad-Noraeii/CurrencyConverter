const currencyList = {
    USD: { name: "United States Dollar", symbol: "$" },
    EUR: { name: "Euro", symbol: "€" },
    GBP: { name: "British Pound", symbol: "£" },
    JPY: { name: "Japanese Yen", symbol: "¥" },
    CHF: { name: "Swiss Franc", symbol: "CHF" },
    AUD: { name: "Australian Dollar", symbol: "A$" },
    CAD: { name: "Canadian Dollar", symbol: "C$" },
    NZD: { name: "New Zealand Dollar", symbol: "NZ$" },
    CNY: { name: "Chinese Yuan", symbol: "¥" },
    HKD: { name: "Hong Kong Dollar", symbol: "HK$" },
    SGD: { name: "Singapore Dollar", symbol: "S$" },
    INR: { name: "Indian Rupee", symbol: "₹" },
    RUB: { name: "Russian Ruble", symbol: "₽" },
    BRL: { name: "Brazilian Real", symbol: "R$" },
    ZAR: { name: "South African Rand", symbol: "R" },
    KRW: { name: "South Korean Won", symbol: "₩" },
    TRY: { name: "Turkish Lira", symbol: "₺" },
    MXN: { name: "Mexican Peso", symbol: "Mex$" },
    AED: { name: "United Arab Emirates Dirham", symbol: "د.إ" },
    ARS: { name: "Argentine Peso", symbol: "$" },
    BDT: { name: "Bangladeshi Taka", symbol: "৳" },
    BHD: { name: "Bahraini Dinar", symbol: ".د.ب" },
    CLP: { name: "Chilean Peso", symbol: "CLP$" },
    COP: { name: "Colombian Peso", symbol: "COL$" },
    CZK: { name: "Czech Koruna", symbol: "Kč" },
    DKK: { name: "Danish Krone", symbol: "kr" },
    EGP: { name: "Egyptian Pound", symbol: "ج.م" },
    HUF: { name: "Hungarian Forint", symbol: "Ft" },
    IDR: { name: "Indonesian Rupiah", symbol: "Rp" },
    ILS: { name: "Israeli Shekel", symbol: "₪" },
    KWD: { name: "Kuwaiti Dinar", symbol: "د.ك" },
    MYR: { name: "Malaysian Ringgit", symbol: "RM" },
    NOK: { name: "Norwegian Krone", symbol: "kr" },
    PHP: { name: "Philippine Peso", symbol: "₱" },
    PKR: { name: "Pakistani Rupee", symbol: "₨" },
    PLN: { name: "Polish Zloty", symbol: "zł" },
    SAR: { name: "Saudi Riyal", symbol: "ر.س" },
    SEK: { name: "Swedish Krona", symbol: "kr" },
    THB: { name: "Thai Baht", symbol: "฿" },
    TWD: { name: "Taiwan Dollar", symbol: "NT$" },
    UAH: { name: "Ukrainian Hryvnia", symbol: "₴" },
    VND: { name: "Vietnamese Dong", symbol: "₫" },
    IRR: { name: "Iranian Rial", symbol: "ریال" },
    IQD: { name: "Iraqi Dinar", symbol: "د.ع" },
    LBP: { name: "Lebanese Pound", symbol: "ل.ل" },
    JOD: { name: "Jordanian Dinar", symbol: "د.ا" },
    OMR: { name: "Omani Rial", symbol: "ر.ع" },
    KZT: { name: "Kazakhstani Tenge", symbol: "₸" },
    QAR: { name: "Qatari Riyal", symbol: "ر.ق" },
    NGN: { name: "Nigerian Naira", symbol: "₦" },
    EEK: { name: "Estonian Kroon", symbol: "kr" }
};

async function loadCurrencies() {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    Object.keys(currencyList).forEach(currency => {
        const optionFrom = createCurrencyOption(currency);
        const optionTo = createCurrencyOption(currency);

        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
    });
}

function createCurrencyOption(currency) {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = `${currency} (${currencyList[currency].name})`;
    return option;
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const resultElement = document.getElementById('result');

    if (!amount || amount <= 0) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }

    resultElement.textContent = "Loading...";

    try {
        const rate = await fetchExchangeRate(from, to);
        const result = (amount * rate).toFixed(2);
        resultElement.textContent = `Result: ${result} ${currencyList[to].symbol}`;
    } catch (error) {
        console.error('Error retrieving exchange rate information:', error);
        resultElement.textContent = "Error retrieving exchange rate information.";
    }
}

async function fetchExchangeRate(from, to) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const rate = data.rates[to];
    if (!rate) {
        throw new Error('Rate not found for selected currency');
    }
    return rate;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCurrencies();
    document.getElementById('convertButton').addEventListener('click', convertCurrency);
});
