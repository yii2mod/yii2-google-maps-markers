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

Google Maps Options 
----------------
You can find them on the [options page](https://developers.google.com/maps/documentation/javascript/reference)
