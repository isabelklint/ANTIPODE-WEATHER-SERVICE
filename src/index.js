function getTime (now) {
    let hr = now.getHours();
    let min = now.getMinutes();
    if (min < 10) {
        min = `0${min}`;
    }
    let timeNow = `${hr}:${min}`;

    let dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let dayName = dayNames[now.getDay()];
    return `${dayName} ${timeNow};
    `;
}

let span = document.querySelector("#day-time");
let now = new Date();
span.innerHTML = getTime(now);

function setTemp(response) {
    cvalue =  document.querySelector("#temp").innerHTML = Math.round(
        response.data.main.temp
      );
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = cvalue;
    document.querySelector("#humidity").innerHTML = ` ` + response.data.main.humidity+`%`;
    document.querySelector("#wind").innerHTML = ` ` + Math.round(
      response.data.wind.speed
    )+`km/h`;
    document.querySelector("#description").innerHTML = response.data.weather[0].description + `.`;
    let icon = response.data.weather[0].icon;
    let faIcon = getfaIcon(icon);
    document.querySelector("#icon").innerHTML =
      faIcon;
      let cityExists = response.data.name;
    if (cityExists !="") {
    getUpsidedown(cityExists);
    } else {
        alert("No antipode.")
    }
}

function getCityFromLocation(position) {
    let apiKey = "af299e40c9c7667df5a6bc3d09004719";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(setTemp);
}

function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCityFromLocation);
    setWaves();
}

function setWaves () {
    document.querySelector("#upsidedown-city-name").innerHTML = "NO ANTIPODE";
    document.querySelector("#upsidedown-icon").innerHTML = `<i class="fa-solid fa-water"></i>`;
}

let locationButton = document.querySelector("#locationbutton");
locationButton.addEventListener("click", getLocation);

function getCityFromSearch(city) {
    let apiKey = "af299e40c9c7667df5a6bc3d09004719";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(setTemp);
    setWaves();
}

function doSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#searchbar").value;
    getCityFromSearch(city);
    console.log(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", doSubmit);
form.addEventListener("submit", doUpsidedownClick);

function setUpsidedownTemp(response) {
    let citycode = response.data.name;
    if (citycode != '') {
        let countrycode = response.data.sys.country;
        let countryName = getCountryName(countrycode);
        document.querySelector("#upsidedown-city-name").innerHTML = 
            `${response.data.name}, ${countryName}`;
        document.querySelector("#upsidedown-temp").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#units").innerHTML="°C";
        let icon = response.data.weather[0].icon;
        let faIcon = getfaIcon(icon);
        document.querySelector("#upsidedown-icon").innerHTML =
          faIcon;
        } else {
            setWaves();
        }
    }
function getUpsidedown(city) {
    let city1 = city;
    let apiKey = `91d2874dec523f85475552340d0ebfb8`;
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city1}&limit=1&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(getOtherCity);
}

function getOtherCity (response) {
    let apiKey = "af299e40c9c7667df5a6bc3d09004719";
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
    let upsidedownLatitude = Math.round(-latitude);
    if (longitude < 0 ) {
        let upsidedownLongitude = 180 - Math.round(Math.abs(longitude));
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${upsidedownLatitude}&lon=${upsidedownLongitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(setUpsidedownTemp);
    } else if (longitude >= 0) {
        let upsidedownL = 180 - Math.round(Math.abs(longitude));
        let upsidedownLongitude = -(upsidedownL);
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${upsidedownLatitude}&lon=${upsidedownLongitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(setUpsidedownTemp);
    }
}

function doUpsidedownClick(event) {
    event.preventDefault();
    let city = document.querySelector("#searchbar").value;
    getUpsidedown(city);
}


function switchToFahrenheit (event) {
    event.preventDefault();
    let switchTemp = document.querySelector("#temp");
    let ftemp = (cvalue * 9/5) + 32;
    switchTemp.innerHTML = Math.round(ftemp);
}

function switchToCentigrade (event) {
    event.preventDefault();
    let switchTemp = document.querySelector("#temp");
    switchTemp.innerHTML = cvalue;
}

let fdegree = document.querySelector("#fahrenheitLink");
fdegree.addEventListener("click", switchToFahrenheit);

let cdegree = document.querySelector("#centigradeLink");
cdegree.addEventListener('click', switchToCentigrade);

let cvalue = null;

//https://gist.github.com/themeteorchef/dcffd74ca3ab45277c81
var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

var faIcons = {
    '01d' : '<i class="fa-solid fa-sun"></i>',  /* clear sky */
    '02d' : '<i class="fa-solid fa-cloud"></i>',  /* few clouds */
    '03d' : '<i class="fa-solid fa-cloud"></i>',  /* scattered clouds */
    '04d' : '<i class="fa-solid fa-cloud"></i>',  /* broken clouds */
    '09d' : '<i class="fa-solid fa-cloud-rain"></i>',  /* shower rain */
    '10d' : '<i class="fa-solid fa-cloud-showers-heavy"></i>',  /* rain */
    '11d' : '<i class="fa-solid fa-bolt"></i>',  /* thunderstorm */
    '13d' : '<i class="fa-solid fa-snowflake"></i>',  /* snow */
    '50d' : '<i class="fa-solid fa-cloud-fog"></i>',  /* mist */
    '01n' : '<i class="fa-solid fa-moon"></i>',  /* same as above but n for night */
    '02n' : '<i class="fa-solid fa-cloud-moon"></i>',
    '03n' : '<i class="fa-solid fa-cloud-moon"></i>',
    '04n' : '<i class="fa-solid fa-cloud-moon"></i>',
    '09n' : '<i class="fa-solid fa-cloud-moon-rain"></i>',
    '10n' : '<i class="fa-solid fa-cloud-moon-rain"></i>',
    '11n' : '<i class="fa-solid fa-bolt"></i>',
    '13n' : '<i class="fa-solid fa-snowflake"></i>',
    '50n' : '<i class="fa-solid fa-cloud-fog"></i>',
};

function getfaIcon (icon) {
    if (faIcons.hasOwnProperty(icon)) {
        return faIcons[icon];
    } else {
        return icon;
    }
}
