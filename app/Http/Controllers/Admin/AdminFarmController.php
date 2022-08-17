<?php

namespace App\Http\Controllers\Admin;

use App\Models\Farm;
use APp\Models\Greenhouse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}