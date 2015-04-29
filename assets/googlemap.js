/**
 * Google Map manager - renders map and put markers
 * Address priority - House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country
 */
yii.googleMapManager = (function ($) {
    var map;
    var pub = {
        isActive: false,
        nextAddress: 0,
        delay: 100,
        bounds: new google.maps.LatLngBounds(),
        geocoder: new google.maps.Geocoder(),
        infoWindow: new google.maps.InfoWindow({
            content: '',
            maxWidth: 250
        }),
        options: [],
        containerId: 'map_canvas',
        geocodeData: [],
        mapOptions: [],
        listeners: [],
        renderEmptyMap: true,
        // Init function
        init: function () {
            initOptions();
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
            if (pub.renderEmptyMap && pub.geocodeData.length === pub.nextAddress) {
                pub.mapOptions.center = new google.maps.LatLng(28.562635, 16.1397892);
            }
            map = new google.maps.Map(container, pub.mapOptions);
        },

        /**
         * Get address and place it on map
         */
        getAddress: function (search, htmlContent, loadMap) {
            pub.geocoder.geocode({'address': search}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var place = results[0];
                    var position = place.geometry.location;
                    pub.bounds.extend(position);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: position
                    });
                    bindInfoWindow(marker, map, pub.infoWindow, htmlContent);
                    map.fitBounds(pub.bounds);
                }
                else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    pub.nextAddress--;
                    pub.delay++;
                }
                loadMap();
            });
        }
    };

    /**
     * Setup googleMapManager properties
     */
    function initOptions() {
        for (var property in pub.options) {
            if (pub.hasOwnProperty(property)) {
                pub[property] = pub.options[property];
            }
        }
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
            var address = pub.geocodeData[pub.nextAddress].address;
            var htmlContent = pub.geocodeData[pub.nextAddress].htmlContent;
            setTimeout(function () {
                pub.getAddress(address, htmlContent, loadMap)
            }, pub.delay);
            pub.nextAddress++;
        }
    }

    return pub;
})
(jQuery);