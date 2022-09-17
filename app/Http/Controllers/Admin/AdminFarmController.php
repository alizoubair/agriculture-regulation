<?php

namespace App\Http\Controllers\Admin;

use App\Models\Farm;
use App\Models\Greenhouse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Str;

class AdminFarmController extends Controller
{
	public function index(Request $request)
	{
		if ($request->ajax()) {
			$data = Farm::latest()->get();

			return Datatables::of($data)
					->addIndexColumn()
					->filter(function ($instance) use ($request) {
						if (!empty($request->get('name'))) {
							$instance->collection = $instance->collection->filter(function ($row) use ($request) {
								return Str::contains($row['name'], $request->get('name')) ? true : false;
							});
						}
					})
					->addColumn('name', function($farm) {
						return '<a id="'.$farm->name.'" href="#">'.$farm->name.'</a>';
					})
					->addColumn('action', function($farm) {
						return '<a id="updateBtn" href="/admin/farms/'.$farm->id.'/edit"><i class="bi bi-pencil-fill"></i></a>
								<form  action="/admin/farms/'.$farm->id.'/delete" method="POST">
									<button id="deleteBtn" type="submit"><i class="bi bi-trash-fill"></i></button>
								</form>';
					})
					->rawColumns(['name', 'action'])
					->toJson();
		}

		return view('admin.farm.index');
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
		$newFarm->setZoomLevel($request->input('zoom'));
		$newFarm->setCenter($request->input('center'));
		$newFarm->setCoordinates($request->input('coordinates'));
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
		$farm->setCoordinates($request->input('coordinates'));
		$farm->setCenter($request->input('center'));
		$farm->setZoomLevel($request->input('zoom'));
		$farm->save();

		return redirect()->route('admin.farm.index');
	}
}
