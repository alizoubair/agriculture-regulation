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

	public function display()
	{
		return view('admin.farm.create');
	}

	public function create(Request $request)
	{
		$newFarm = new Farm();
		$newFarm->setName($request->input('name'));
		$newFarm->setArea($request->input('area'));
		$newFarm->setPerimeter($request->input('perimeter'));
		$newFarm->save();

		return redirect()->route('admin.farm.index');
	}
}