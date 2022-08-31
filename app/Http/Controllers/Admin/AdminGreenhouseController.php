<?php 

namespace APp\Http\Controllers\Admin;

use App\Models\Greenhouse;
use App\Models\Farm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminGreenhouseController extends Controller
{
	function index()
	{
		$viewData['greenhouses'] = Greenhouse::all();
		return view('admin.greenhouse.create')->with('viewData', $viewData);
	}

	function display()
	{
		$viewData['farms'] = Farm::all();
		return view('admin.greenhouse.create')->with('viewData', $viewData);
	}

	public function create(Request $request)
	{
		$newGreenhouse = new Greenhouse();
		$newGreenhouse->setName($request->input('name'));
		$newGreenhouse->setFarmId($request->input('farm_id'));
		$newGreenhouse->setPerimeter($request->input('perimeter'));
		$newGreenhouse->setArea($request->input('area'));
		$newGreenhouse->setZoomLevel($request->input('zoom'));
		$newGreenhouse->setCenter($request->input('center'));
		$newGreenhouse->setCoordinates($request->input('coordinates'));
		$newGreenhouse->save();

		return redirect()->route('admin.farm.index');
	}

	public function delete($id)
	{
		$greenhouse = Greenhouse::find($id);
		$greenhouse->delete();
		return back();
	}

	public function edit($id)
	{
		$viewData = [];
		$viewData['greenhouse'] = Greenhouse::findOrFail($id);
		$farmData['farms'] = Farm::all();
		return view('admin.greenhouse.edit')->with("viewData", $viewData)->with("farmData", $farmData);
	}

	public function update(Request $request, $id)
	{
		$greenhouse = Greenhouse::findOrFail($id);
		$greenhouse->setName($request->input('name'));
		$greenhouse->setFarmId($request->input('farm_id'));
		$greenhouse->setArea($request->input('area'));
		$greenhouse->setPerimeter($request->input('perimeter'));

		$greenhouse->save();

		return redirect()->route('admin.farm.index');
	}
}