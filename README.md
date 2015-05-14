Google Maps Markers Widget for Yii2
==========
- GoogleMaps Widget displays a set of user addresses as markers on the map.

Installation   
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist yii2mod/yii2-google-maps-markers "*"
```

or add

```json
"yii2mod/yii2-google-maps-markers": "*"
```

to the require section of your composer.json.

Usage
------------
To use GoogleMaps, you need to configure its [[userLocations]] property. For example:

```php
  echo GoogleMaps::widget([
      'userLocations' => [
            [
                'location' => [
                    'address' => 'Kharkov',
                    'country' => 'Ukraine',
                ],
                'htmlContent' => '<h1>Kharkov</h1>'
            ],
            [
                'location' => [
                    'city' => 'New York',
                    'country' => 'Usa',
                ],
                'htmlContent' => '<h1>New York</h1>'
            ],
      ]
  ]); 
```

Configuration
----------------------------------------

To configure the Google Maps key or other options like language, version, library, or map options:
```php
 echo GoogleMaps::widget([
      'userLocations' => [......],
      'googleMapsUrlOptions' => [
          'key' => 'this_is_my_key',
          'language' => 'id',
          'version' => '3.1.18'
      ],
      'googleMapsOptions' => [
          'mapTypeId' => 'roadmap',
          'tilt' => 45,
          'zoom' => 5
      ]
  ]); 
```
OR via yii params configuration. For example:
```php
'params' => [
    'googleMapsUrlOptions' => [
          'key' => 'this_is_my_key',
          'language' => 'id',
          'version' => '3.1.18'
     ],
    'googleMapsOptions' => [
          'mapTypeId' => 'roadmap',
          'tilt' => 45,
          'zoom' => 10
     ]  
],
```
To get key, please visit [options page](https://code.google.com/apis/console/)

Google Maps Options 
----------------
You can find them on the [options page](https://developers.google.com/maps/documentation/javascript/reference)
