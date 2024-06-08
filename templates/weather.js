export function build(data) {
    const weatherApplet = `<div class="col d-flex justify-content-start mb-2" style="height: fit-content;">
    <div class="bg-dark p-2 rounded-3 w-100 text-center">
        <div class="d-flex justify-content-center">
            <p class="mb-0">${tr("currently")}</p>
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <h1 class="display-1 fw-medium">${data.main.temp}°C</h1>
        </div>
        <div class="mt-1 d-flex justify-content-center">
            <h4 class="mb-0 text-capitalize">${tr(data.weather[0].main.toLowerCase())}</h4>
        </div>
        <div class="mt-3 d-flex justify-content-center">
            <h4 class="mb-0">
                <span>${tr("high")}: </span>
                <span>${data.main.temp_max}°</span>
                <span>${tr("low")}: </span>
                <span>${data.main.temp_min}°</span>
                <span>${tr("humidity")}: </span>
                <span>${data.main.humidity}%</span>
            </h4>
        </div>
        <hr>
        <div class="mt-3 d-flex justify-content-start">
            <table class="table table-dark table-borderless table-striped">
                <tbody>
                    <tr>
                        <td>${tr("feels_like")}</td>
                        <td>${data.main.feels_like}°</td>
                    </tr>
                    <tr>
                        <td>${tr("pressure")}</td>
                        <td>${data.main.pressure} mbar</td>
                    </tr>
                    <tr>
                        <td>${tr("sunrise")}</td>
                        <td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString(defaultLang)}</td>
                    </tr>
                    <tr>
                        <td>${tr("sunset")}</td>
                        <td>${new Date(data.sys.sunset * 1000).toLocaleTimeString(defaultLang)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-3 d-flex justify-content-center">
            <p class="mb-0">
                <span>${new Date().toLocaleDateString(defaultLang, { weekday: "long" })}</span>
                <span class="mx-1">•</span>
                <span>${data.name}</span>
                <span>${data.sys.country}</span>
            </p>
        </div>
    </div>
</div>`

    messageContainer.innerHTML += weatherApplet;
}