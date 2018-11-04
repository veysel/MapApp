
// Public variable accessing html elements
let element = {
    searchInput: document.getElementById("search-input"),
    searchElement: document.getElementById("search")
};

// The input element to focus
element.searchInput.focus();

// Map screen load section
let map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});

// A method for obtaining data in a synchronized manner
let GetData = (url, type) => {
    let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            resolve(JSON.parse(xhttp.responseText));
        };

        xhttp.open(type, url, true);
        xhttp.send();
    });

    return promise;
};

// Data input detection method
let SearchKeyup = () => {
    if (element.searchInput.value.length > 0) {
        element.searchElement.style.top = "25%";

        GetData("./config.json", "GET").then((data) => {
            if (data) {
                let url = data.SearchMapOptions.url;
                url = url.replace("{searchText}", element.searchInput.value);

                GetData(url, "GET").then((data) => {
                    // TODO: List display module will added
                });
            }
        });
    }
    else {
        element.searchElement.style.top = "50%";
    }
};