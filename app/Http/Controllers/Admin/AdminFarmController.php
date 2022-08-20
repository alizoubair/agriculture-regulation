<?php

namespace App\Http\Controllers\Admin;

use App\Models\Farm;
use App\Models\Greenhouse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminFarmController extends Controller
{
	public function index()
	{
		$farmData["farms"] = Farm::all();
		$greenhouseData['greenhouses'] = Greenhouse::all();
		return view('admin.farm.index')->with("farmData", $farmData)->with("greenhouseData", $greenhouseData); 
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

	public function delete($id)
	{
		$farm = Farm::find($id);
		$farm->delete();
		return back();
	}
}