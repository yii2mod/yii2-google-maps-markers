/**
 * Google Map manager - renders map and put markers
 * Address priority - House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country
 */
yii.googleMapManager = (function ($) {
    var pub = {
        nextAddress: 0,
        zeroResult: 0,
        delay: 100,
        bounds: [],
        geocoder: [],
        infoWindow: [],
        infoWindowOptions: [],
        containerId: 'map_canvas',
        geocodeData: [],
        mapOptions: [],
        listeners: [],
        renderEmptyMap: true,
        map: null,
        init: function () {
        },
        // Init function
        initModule: function (options) {
            initOptions(options);
            google.maps.event.addDomListener(window, 'load', pub.initializeMap());
            loadMap();
            registerListeners();
        },
        // Initialize map
        initializeMap: function () {
            var container = document.getElementById(pub.containerId);
            container.style.width = '100%';
            container.style.height = '100%';
            // Set default center if renderEmptyMap property set to true, and empty geocodeData
            if (pub.renderEmptyMap && pub.geocodeData.length == false) {
                pub.mapOptions.center = new google.maps.LatLng(28.562635, 16.1397892);
            }
            pub.map = new google.maps.Map(container, pub.mapOptions);
        },

        /**
         * Get address and place it on map
         */
        getAddress: function (location, htmlContent, loadMap) {
            var search = location.address;
            pub.geocoder.geocode({'address': search}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var place = results[0];
                    var position = place.geometry.location;
                    pub.bounds.extend(position);
                    var marker = new google.maps.Marker({
                        map: pub.map,
                        position: position
                    });
                    bindInfoWindow(marker, pub.map, pub.infoWindow, htmlContent);
                    pub.map.fitBounds(pub.bounds);
                }
                else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    pub.nextAddress--;
                    pub.delay++;
                }
                else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                    //If first query return zero results, then set address the value of the country
                    if (location.address != location.country) {
                        location.address = location.country;
                        pub.getAddress(location, htmlContent, loadMap)
                    }
                }
                loadMap();
            });
            // If for all search address status is ZERO_RESULTS, then render empty map
            if ((pub.geocodeData.length - 1) == pub.zeroResult) {
                pub.map.setCenter(new google.maps.LatLng(28.562635, 16.1397892));
            }
        }
    };

    /**
     * Setup googleMapManager properties
     */
    function initOptions(options) {
        for (var property in options) {
            if (pub.hasOwnProperty(property)) {
                pub[property] = options[property];
            }
        }
        pub.bounds = new google.maps.LatLngBounds();
        pub.geocoder = new google.maps.Geocoder();
        pub.infoWindow = new google.maps.InfoWindow(pub.infoWindowOptions);
        pub.map = null;
        pub.nextAddress = 0;
        pub.zeroResult = 0;
    }

    /**
     * Register listeners
     */
    function registerListeners() {
        for (listener in pub.listeners) {
            if (pub.listeners.hasOwnProperty(listener)) {
                var object = pub.listeners[listener].object;
                var event = pub.listeners[listener].event;
                var handler = pub.listeners[listener].handler;
                google.maps.event.addListener(pub[object], event, handler);
            }
        }
    }

    /**
     * Binds a map marker and infoWindow together on click
     * @param marker
     * @param map
     * @param infoWindow
     * @param html
     */
    function bindInfoWindow(marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
        });
    }

    /**
     * Dynamic call fetchPlaces function with delay
     */
    function loadMap() {
        if (pub.nextAddress < pub.geocodeData.length) {
            var location = {
                country: pub.geocodeData[pub.nextAddress].country,
                address: pub.geocodeData[pub.nextAddress].address
            };
            var htmlContent = pub.geocodeData[pub.nextAddress].htmlContent;
            setTimeout(function () {
                pub.getAddress(location, htmlContent, loadMap)
            }, pub.delay);
            pub.nextAddress++;
        }
    }

    return pub;
})
(jQuery);
