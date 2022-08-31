<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Greenhouse extends Model
{
	/**
    * $this->attributes['id'] - int - contains the greenhouse primary key(id);
    * $this->attributes['name'] - string - contains the greenhouse name;
    * $this->attributes['farm_id'] - int - contains the referenced farm id;
    * $this->attributes['perimeter'] - int - contains the perimeter;
    * $this->attributes['area'] - int - contains the area;
    * $this->attributes['created_at'] - timestamp - contains the greenhouse creation date;
    * $this->attributes['updated_at'] - timestamp - contains the greenhouse update date;
    */

	public static function validate($request)
	{
		$request->validate([
			"farm_id"=>"required|exists:farms,id",
		]);
	}

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

    public function getFarmId()
    {
    	return $this->attributes['farm_id'];
    }

    public function setFarmId($farmId)
    {
    	$this->attributes['farm_id'] = $farmId;
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

    public function getZoomLevel()
    {
        return $this->attributes['zoom'];
    }

    public function setZoomLevel($zoom)
    {
        $this->attributes['zoom'] = $zoom;
    }

    public function getCenter()
    {
        return $this->attributes['center'];
    }

    public function setCenter($center)
    {
        $this->attributes['center'] = $center;
    }

    public function getCoordinates()
    {
        return $this->attributes['coordinates'];
    }

    public function setCoordinates($coordinates)
    {
        $this->attributes['coordinates'] = $coordinates;
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
}