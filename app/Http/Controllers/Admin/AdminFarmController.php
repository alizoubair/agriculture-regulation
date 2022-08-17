<?php

namespace App\Http\Controllers\Admin;

use App\Models\Farm;
use APp\Models\Greenhouse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mapper;

class AdminFarmController extends Controller
{
	public function index()
	{
		$viewData["title"] = "Farms";
		$viewData["farms"] = Farm::all();
		return view('admin.farm.index')->with("viewData", $viewData); 
	}

	public function create(Request $request)
	{
		$newFarm = new Farm();
		$newFarm->setName($request->input('name'));
		$newFarm->setPerimeter($request->input('perimeter'));
		$newFarm->setArea($request->input('area'));
		$newFarm->save();

		return back();
	}

	public function createGreenhouse(Request $request)
	{
		$newGreenhouse = new Greenhosue();
		$newGreenhouse->setName($request->input(name));
		$newGreenhouse->setFarmId($request->input('farm_id'));
		$newGreenhouse->setPerimeter($request->input('perimeter'));
		$newGreenhouse->setArea($request->input('area'));
		$newGreenhouse->save();

		return back();
	}
}