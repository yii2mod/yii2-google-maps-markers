<?php

namespace yii2mod\google\maps\markers;

use yii\web\AssetBundle;

/**
 * Class GoogleMapsAsset
 * @package yii2mod\google\maps\markers
 */
class GoogleMapsAsset extends AssetBundle
{
    /**
     * @var string
     */
    public $sourcePath = '@vendor/yii2mod/yii2-google-maps-markers/assets';

    /**
     * @var array
     */
    public $js = [
        'markerclusterer_compiled.js',
        'googlemap.js',
    ];

}
