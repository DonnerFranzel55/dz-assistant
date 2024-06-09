const build = "DZAP.20240609.002.004"
const version = "0.0.2"
let defaultLang = getSetting("lang") || setSetting("lang", "en");
let defaultCountry = getSetting("country") || setSetting("country", "US");
let reqLang = getSetting("req_lang") || defaultLang;
let rate = 1;
let pitch = 1;
let weatherUnit = "metric"



const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);
recognition.interimResults = false;
recognition.lang = defaultLang + "-" + defaultCountry;

const startButton = document.getElementById('start-btn');
const messageContainer = document.getElementById("messageHistory");
document.getElementById("buildNumber").textContent = build
document.getElementById("versionNumber").textContent = version

// Start recognition when the button is clicked
startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then(stream => {

            document.getElementById("microphoneSelcet").innerHTML = `<md-select-option value="0">${stream.getTracks()[0].label}</md-select-option>`
            document.getElementById("starter-promt").classList.add("d-none")
            recognition.start();
            startButton.innerHTML = '<md-icon filled>graphic_eq</md-icon>';
        })
        .catch(error => {
            startButton.innerHTML = '<md-icon filled>mic_off</md-icon>';
        });

});

// Handle the results from the speech recognition
recognition.addEventListener('result', (event) => {
    document.getElementById("speechHistory").innerHTML += `<details class="fs-5">${Array.from(event.results).map(result => result[0]).map(result => result.transcript)}</details>`
    const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');

    messageContainer.innerHTML += `<div class="col d-flex justify-content-end mb-2"><div style="background-color: var(--md-sys-color-surface-container-high);" class="p-2 rounded-3"><p class="mb-0">${transcript || event.result}</p></div></div>`

    //document.getElementById("speechHistory").innerHTML += `<details class="fs-5">${transcript}</details>`

    switch (true) {
        case transcript.includes(tr("hello").toLowerCase()):
            speak(tr("how_can_i_assist_you_today"));
            setTimeout(() => {
                recognition.start();
                startButton.innerHTML = '<md-icon filled>graphic_eq</md-icon>';
            }, 3000);
            break;
        case transcript.includes(tr("time")):
        case transcript.includes(tr("clock")):
        case transcript.includes(tr("what_time_is_it")):
            const time = new Date().toLocaleTimeString(defaultLang, { hour: "numeric", minute: "numeric" });
            speak(`${tr("the_current_time_is")} ${time}`);
            break;
        case transcript.includes(tr("date")):
            const date = new Date().toLocaleDateString(defaultLang, { day: "numeric", month: "long", year: "numeric", weekday: "long" });
            speak(`${tr("today_is_the")} ${date}`);
            break;
        case transcript.includes(tr("weather")) && transcript.includes(tr("in")):
            const transcriptArray = transcript.split(" ");
            const indexIn = transcriptArray.indexOf("in");
            const locations = transcriptArray.slice(indexIn + 1).join(" ");
            getWeather(locations);
            break;
        case transcript.includes(tr("tell_a_joke")):
            getJoke("Any");
            break;
        case transcript.includes(tr("tell_a_programmer_joke")):
            getJoke("Programming");
            break;
        case transcript.includes(tr("tell_a_misc_joke")):
            getJoke("Miscellaneous");
            break;
        case transcript.includes(tr("tell_a_dark_joke")):
            getJoke("Dark");
            break;
        case transcript.includes(tr("tell_a_pun_joke")):
            getJoke("Pun");
            break;
        case transcript.includes(tr("tell_a_spooky_joke")):
            getJoke("Spooky");
            break;
        case transcript.includes(tr("tell_a_xmas_joke")):
            getJoke("Christmas");
            break;
        case transcript.includes(tr("give_me_an_advice")):
            getAdvice();
            break;
        case transcript.includes(tr("whats_my_ip")):
        case transcript.includes(tr("my_ip")):
            getMyIp();
            break;
        default:
            speak(tr("didnt_understand_that"));
    }

    startButton.innerHTML = '<md-icon filled>mic</md-icon>';
});

// Restart recognition in case of no match or end
recognition.addEventListener('nomatch', () => {
    speak(tr("didnt_understand_that"));
    startButton.innerHTML = '<md-icon filled>mic</md-icon>';
});

recognition.addEventListener('end', () => {
    startButton.innerHTML = '<md-icon filled>mic</md-icon>';
});

// Function to speak a given text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = defaultLang + "-" + defaultCountry;
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.speak(utterance);
    messageContainer.innerHTML += `<div class="col d-flex justify-content-start mb-2"><div style="background-color: var(--md-sys-color-surface-container-high);" class="p-2 rounded-3"><p class="mb-0">${text}</p></div></div>`
}

//External Function
async function getWeather(location) {
    const apiKey = getSetting("weather_apikey") || setSetting("weather_apikey", "demo");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${weatherUnit}&lang=${reqLang}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const dataJ = data
            console.log(data);
            const weather = data.weather[0].main;
            const temp = data.main.temp;
            const template = tr("weather_in")
            let trKeyDegreeUnit = "";
            if (weatherUnit === "metric") {
                trKeyDegreeUnit = "c"
            }
            if (weatherUnit === "imperial") {
                trKeyDegreeUnit = "f"
            }
            import("./../../templates/weather.js").then(data => {
                data.build(dataJ, trKeyDegreeUnit)
            })
            speak(template.replace("%s", location).replace("%s", tr(weather.toLowerCase())).replace("%s", temp) + tr(trKeyDegreeUnit));
        } else {
            speak(tr("weather_location_error").replace("%s", location));
        }
    } catch (error) {
        speak(tr("service_unavailable"));
    }
}

async function getJoke(category) {
    fetch(`https://v2.jokeapi.dev/joke/${category}?format=txt&lang=${reqLang}`)
        .then(res => res.text())
        .then(data => {
            speak(data)
        })
        .catch(error => {
            console.error(error);
            speak(tr("service_unavailable"))
        })
}

async function getAdvice() {
    fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(data => {
            speak(data.slip.advice)
        })
        .catch(error => {
            console.error(error);
            speak(tr("service_unavailable"))
        })
}

async function getMyIp() {
    const customIP = getSetting("my_custom_ip_adress") || ""
    fetch(`http://ip-api.com/json/${customIP}?fields=66846719&lang=${reqLang}`)
        .then(res => res.json())
        .then(data => {
            const dataJ = data
            if (data.status === "success") {
                const template = tr("ip_response");
                speak(template.replace("%s", data.query))
                import("./../../templates/ip.js")
                    .then(data => {
                        data.build(dataJ)
                    })
            } else {
                speak(tr("invalidIpAdress"))
            }

        })
        .catch(error => {
            console.error(error);
            speak(tr("service_unavailable"))
        })
}