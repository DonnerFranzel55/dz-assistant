let defaultLang = getSetting("lang") || setSetting("lang", "en");
let defaultCountry = "US";
let rate = 1;
let pitch = 1;


// Ensure compatibility with different browsers
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = defaultLang + "-" + defaultCountry;

const startButton = document.getElementById('start-btn');
const messageContainer = document.getElementById("messageHistory");

// Start recognition when the button is clicked
startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
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
    const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');

    messageContainer.innerHTML += `<div class="col d-flex justify-content-end mb-2"><div class="bg-dark p-2 rounded-3"><p class="mb-0">${transcript}</p></div></div>`

    switch (true) {
        case transcript.includes(tr("hello").toLowerCase()):
            speak('Hello! How can I assist you today?');
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
        default:
            console.log(transcript.includes(tr("hello").toLowerCase()));
            speak(tr("didnt_understand_that"));
    }

    startButton.innerHTML = '<md-icon filled>mic</md-icon>';
});

// Restart recognition in case of no match or end
recognition.addEventListener('nomatch', () => {
    speak('I did not understand that.');
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
    messageContainer.innerHTML += `<div class="col d-flex justify-content-start mb-2"><div class="bg-dark p-2 rounded-3"><p class="mb-0">${text}</p></div></div>`
}

//External Function
async function getWeather(location) {
    const apiKey = getSetting("weather_apikey") || setSetting("weather_apikey", "demo");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const dataJ = data
            const weather = data.weather[0].main;
            const temp = data.main.temp;
            console.log(data);
            const template = tr("weather_in")
            import("./../../templates/weather.js").then(data => {
                data.build(dataJ)
            })
            speak(template.replace("%s", location).replace("%s", tr(weather.toLowerCase())).replace("%s", temp));
        } else {
            speak(`I couldn't get the weather for ${location}.`);
        }
    } catch (error) {
        speak('Sorry, I am having trouble accessing the weather service.');
    }
}