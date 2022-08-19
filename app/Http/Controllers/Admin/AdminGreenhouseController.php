<?php 

namespace APp\Http\Controllers\Admin;

use App\Models\Greenhouse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminGreenhouseController extends Controller
{
	function index()
	{
		return view('admin.greenhouse.create');
	}

	public function create(Request $request)
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