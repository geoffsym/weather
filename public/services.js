// Custom Services
weatherApp.service("cityService", function () {
    this.city = "Rochester, NY";
});

weatherApp.service("weatherService", [
    "$resource",
    function ($resource) {
        this.getWeather = function (city, days) {
            var weatherAPI = $resource(
                "http://api.weatherapi.com/v1/forecast.json?key=65c096c37d0b483c9a9184556231610",
                { callback: "JSON_CALLBACK" },
                +"&" + { get: { method: "JSONP" } }
            );

            return weatherAPI.get({
                q: city,
                days: days
            });
        };
    }
]);
