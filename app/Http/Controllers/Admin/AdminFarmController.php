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
		$newFarm->setLongitude($request->input('lng'));
		$newFarm->setLatitude($request->input('lat'));
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

	public function edit($id)
	{
		$viewData = [];
		$viewData['farm'] = Farm::findOrFail($id);
		return view('admin.farm.edit')->with("viewData", $viewData);
	}

	public function update(Request $request, $id)
	{
		$farm = Farm::findOrFail($id);
		$farm->setName($request->input('name'));
		$farm->setArea($request->input('area'));
		$farm->setPerimeter($request->input('perimeter'));

		$farm->save();

		return redirect()->route('admin.farm.index');
	}
}
