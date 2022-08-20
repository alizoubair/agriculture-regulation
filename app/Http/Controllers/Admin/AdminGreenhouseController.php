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
		$newGreenhouse->save();

		return redirect()->route('admin.farm.index');
	}
}