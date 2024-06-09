export function build(data) {
    const weatherApplet = `<div class="col d-flex justify-content-start mb-2" style="height: fit-content;">
    <div style="background-color: var(--md-sys-color-surface-container-high);" class="p-2 rounded-3 w-100 text-center">
        <div class="d-flex justify-content-center">
            <p class="mb-0 text-capitalize">${tr("my_ip")}</p>
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <h1 class="display-1 fw-medium">${data.query}</h1>
        </div>
        <div class="mt-1 d-flex justify-content-center">
            <h4 class="mb-0 text-capitalize">${data.country}</h4>
        </div>
        <hr>
        <div class="mt-3 d-flex justify-content-start">
            <table class="table table-borderless table-striped">
                <tbody>
                    <tr>
                        <td>${tr("isp")}</td>
                        <td>${data.isp}</td>
                    </tr>
                    <tr>
                        <td>${tr("organisation")}</td>
                        <td>${data.org}</td>
                    </tr>
                    <tr>
                        <td>${tr("as")}</td>
                        <td>${data.as}</td>
                    </tr>
                    <tr>
                        <td>${tr("lat")}</td>
                        <td>${data.lat}</td>
                    </tr>
                    <tr>
                        <td>${tr("lon")}</td>
                        <td>${data.lon}</td>
                    </tr>
                    <tr>
                        <td>${tr("timezone")}</td>
                        <td>${data.timezone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-3 d-flex justify-content-center">
            <p class="mb-0">
                <span>${data.city}</span>
                <span>${data.zip}</span>
                <span>${data.regionName}</span>
                <span>(${data.region})</span>
                <span>${data.country}</span>
                <span>(${data.countryCode})</span>
            </p>
        </div>
    </div>
</div>`

    messageContainer.innerHTML += weatherApplet;
}