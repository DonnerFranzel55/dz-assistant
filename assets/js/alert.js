function createTopBar(h, t, p) {
    document.body.classList.add("overflow-hidden")

    const topBar = document.createElement("div");
    topBar.classList.add("p-2", "w-100", "bg-dark", "rounded", "topbar-in")
    topBar.style.position = "absolute"
    topBar.style.top = "5px"

    const topBarContainer = document.createElement("div")
    topBarContainer.classList.add("container-fluid");

    const row = document.createElement("div")
    row.classList.add("row");

    if (p != null || p != undefined) {
        const ImgCol = document.createElement("div")
        ImgCol.classList.add("col-2","d-none", "d-md-block")
        const IMG = document.createElement("img");
        IMG.classList.add("img-fluid")
        IMG.src = p;
        IMG.alt = p;
        ImgCol.appendChild(IMG);

        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);

        row.appendChild(ImgCol);
        row.appendChild(textCol);
        topBarContainer.appendChild(row)
        topBar.appendChild(topBarContainer)
    } else {
        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);


        row.appendChild(textCol)
        topBarContainer.appendChild(row);
        topBar.appendChild(topBarContainer)

    }
    document.body.appendChild(topBar)
    setTimeout(() => {
        topBar.classList.replace("topbar-in", "topbar-out")
        setTimeout(() => {
            document.body.classList.remove("overflow-hidden")

            document.body.removeChild(topBar)
        }, 200);
    }, 2500);
    return "success"
}
function createTopRightToast(h, t, p) {
    document.body.classList.add("overflow-hidden")

    const topRightToast = document.createElement("div");
    topRightToast.classList.add("p-2", "w-25", "bg-dark", "rounded", "topRightToast-in")
    topRightToast.style.position = "absolute"
    topRightToast.style.top = "5px"
    topRightToast.style.right = "5px"

    const topRightToastContainer = document.createElement("div")
    topRightToastContainer.classList.add("container-fluid");

    const row = document.createElement("div")
    row.classList.add("row");

    if (p != null || p != undefined) {
        const ImgCol = document.createElement("div")
        ImgCol.classList.add("col-1","w-25")
        const IMG = document.createElement("img");
        IMG.classList.add("img-fluid")
        IMG.src = p;
        IMG.alt = p;
        ImgCol.appendChild(IMG);

        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);

        row.appendChild(ImgCol);
        row.appendChild(textCol);
        topRightToastContainer.appendChild(row)
        topRightToast.appendChild(topRightToastContainer)
    } else {
        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);


        row.appendChild(textCol)
        topRightToastContainer.appendChild(row);
        topRightToast.appendChild(topRightToastContainer)

    }
    document.body.appendChild(topRightToast)
    setTimeout(() => {
        topRightToast.classList.replace("topRightToast-in", "topRightToast-out")
        setTimeout(() => {
            document.body.classList.remove("overflow-hidden")

            document.body.removeChild(topRightToast)
        }, 200);
    }, 2500);
    return "success"
}
function createHotBar(h, t, p) {
    document.body.classList.add("overflow-hidden")

    const hotBar = document.createElement("div");
    hotBar.classList.add("p-2", "w-100", "bg-dark", "rounded", "hotbar-in")
    hotBar.style.position = "absolute"
    hotBar.style.bottom = "5px"

    const hotBarContainer = document.createElement("div")
    hotBarContainer.classList.add("container-fluid");

    const row = document.createElement("div")
    row.classList.add("row");

    if (p != null || p != undefined) {
        const ImgCol = document.createElement("div")
        ImgCol.classList.add("col-2","d-none", "d-md-block")
        const IMG = document.createElement("img");
        IMG.classList.add("img-fluid")
        IMG.src = p;
        IMG.alt = p;
        ImgCol.appendChild(IMG);

        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);

        row.appendChild(ImgCol);
        row.appendChild(textCol);
        hotBarContainer.appendChild(row)
        hotBar.appendChild(hotBarContainer)
    } else {
        const textCol = document.createElement("div");
        textCol.classList.add("col")

        const heading = document.createElement("h3");
        heading.classList.add("text-white")
        heading.textContent = h
        textCol.appendChild(heading);

        const descripton = document.createElement("h6");
        descripton.classList.add("text-secondary");
        descripton.textContent = t;
        textCol.appendChild(descripton);


        row.appendChild(textCol)
        hotBarContainer.appendChild(row);
        hotBar.appendChild(hotBarContainer)

    }
    document.body.appendChild(hotBar)
    setTimeout(() => {
        hotBar.classList.replace("hotbar-in", "hotbar-out")
        setTimeout(() => {
            document.body.removeChild(hotBar)
            document.body.classList.remove("overflow-hidden")

        }, 200);
    }, 2500);
    return "success"
}
function createSnackBar(t) {
    document.body.classList.add("overflow-hidden")

    const snackBar = document.createElement("div");
    snackBar.classList.add("p-2", "w-25", "bg-dark", "mx-auto", "rounded", "shadow-lg", "hotbar-in")
    snackBar.style.position = "absolute"
    snackBar.style.bottom = "5px"
    snackBar.style.right = "15%"
    snackBar.style.left = "15%"

    const snackBarContainer = document.createElement("div")
    snackBarContainer.classList.add("container-fluid");

    const row = document.createElement("div")
    row.classList.add("row");


    const textCol = document.createElement("div");
    textCol.classList.add("col")

    const descripton = document.createElement("h6");
    descripton.classList.add("text-white");
    descripton.textContent = t;
    textCol.appendChild(descripton);


    row.appendChild(textCol)
    snackBarContainer.appendChild(row);
    snackBar.appendChild(snackBarContainer)

    document.body.appendChild(snackBar)
    setTimeout(() => {
        snackBar.classList.replace("hotbar-in", "hotbar-out")
        setTimeout(() => {
            document.body.removeChild(snackBar)
            document.body.classList.remove("overflow-hidden")

        }, 200);
    }, 2500);
    return "success"
}