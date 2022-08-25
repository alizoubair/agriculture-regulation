<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Greenhouse;

class Farm extends Model
{
    /**
    * $this->attributes['id']
    * $this->attributes['name']
    * $this->attributes['perimeter']
    * $this->attributes['lng']
    * $this->attributes['lat']
    * $this->attributes['zoom']
    * $this->attributes['area']
    * $this->attrbutes['center']
    * $this->attributes['created_at']
    * $this->attributes['updated_at']
    * $this->greenhouses - Greenhouse[] - contains the associated greenhouses
    */

    public function getId()
    {
        return $this->attributes['id'];
    }

    public function seId($id)
    {
        $this->attributes['id'] = $id;
    }

    public function getName()
    {
        return $this->attributes['name'];
    }

    public function setName($name)
    {
        $this->attributes['name'] = $name;
    }

    public function getLongitude()
    {
        return $this->attributes['lng'];
    }

    public function setLongitude($lng)
    {
        $this->attributes['lng'] = $lng;
    }

    public function getLatitude()
    {
        return $this->attributes['lat'];
    }

    public function setLatitude($lat)
    {
        $this->attributes['lat'] = $lat;
    }

    public function getZoomLevel()
    {
        return $this->attributes['zoom'];
    }

    public function setZoomLevel($zoom)
    {
        $this->attributes['zoom'] = $zoom;
    }
    
    public function getPerimeter()
    {
        return $this->attributes['perimeter'];
    }

    public function setPerimeter($perimeter)
    {
        $this->attributes['perimeter'] = $perimeter;
    }

    public function getArea()
    {
        return $this->attributes['area'];
    }

    public function setArea($area)
    {
        $this->attributes['area'] = $area;
    }

    public function getCenter()
    {
        return $this->attributes['center'];
    }

    public function setCenter($center)
    {
        $this->attributes['center'] = $center;
    }

    public function getCreatedAt()
    {
        return $this->attributes['created_at'];
    }

    public function setCreatedAt($createdAt)
    {
        $this->attributes['created_at'] = $createdAt;
    }

    public function getUpdatedAt()
    {
        return $this->attributes['updated_at'];
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->attributes['updated_at'] = $updatedAt;
    }

    public function greenhouses()
    {
        return $this->hasMany(Greenhouse::class);
    }

    public function getGreenhouses()
    {
        return $this->greenhouses;
    }

    public function setGreenhouses($greenhouses)
    {
        $this->greenhouses = $greenhouses;
    }
}
