<?php 

namespace APp\Http\Controllers\Admin;

use App\Models\Greenhouse;
use App\Models\Farm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Str;

class AdminGreenhouseController extends Controller
{
	function index(Request $request)
	{
		if ($request->ajax()) {
			$data = Greenhouse::latest()->get();

			return Datatables::of($data)
					->addIndexColumn()
					->filter(function ($instance) use ($request) {
						if (!empty($request->get('name'))) {
							$instance->collection = $instance->collection->filter(function ($row) use ($request) {
								return Str::contains($row['name'], $request->get('name')) ? true : false;
							});
						}
					})
					->addColumn('name', function($greenhouse) {
						return '<a href="#">'.$greenhouse->name.'</a>';
					})
					->addColumn('action', function($greenhouse) {
						return '<a id="updateBtn" href="/admin/greenhouses/'.$greenhouse->id.'/edit"><i class="bi bi-pencil-fill"></i></a>
								<form methode="POST">
									<button id="deleteBtn" type="submit"><i class="bi bi-trash-fill"></i></button>
								</form>';
					})
					->rawColumns(['name', 'action'])
					->toJson();
		}

		return view('admin.greenhouse.index');
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

		return redirect()->route('admin.greenhouse.index');
	}

	public function delete($id)
	{
		$greenhouse = Greenhouse::find($id);
		$greenhouse->delete();
		return back();
	}

	public function edit($id)
	{
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
		$greenhouse->setCoordinates($request->input('coordinates'));
		$greenhouse->setCenter($request->input('center'));
		$greenhouse->setZoomLevel($request->input('zoom'));
		$greenhouse->save();

		return redirect()->route('admin.greenhouse.index');
	}
}