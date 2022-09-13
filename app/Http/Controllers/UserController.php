<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $data = User::latest()->get();

            return Datatables::of($data)
                    ->addIndexColumn()
                    ->filter(function ($instance) use ($request) {
                        if (!empty($request->get('name'))) {
                            $instance->collection = $instance->collection->filter(function ($row) use ($request) {
                                return Str::contains($row['name'], $request->get('name')) ? true : false;
                            });
                        }

                        if (!empty($request->get('user_type'))) {
                            $instance->collection = $instance->collection->filter(function ($row) use ($request) {
                                return Str::contains($row['user_type'], $request->get('user_type')) ? true : false;
                            });
                        }
                    })
                    ->addColumn('action', function($row){
                        $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';
                         return $btn;
                 })

                 ->rawColumns(['action'])

                 ->make(true);
        }

        return view('user.index');
    }

    public function display() 
    {
        return view('user.create');
    }

    public function create(Request $request) 
    {
        $newUser = new User();
        $newUser->setName($request->input('name'));
        $newUser->setEmail($request->input('email'));
        $newUser->setPassword($request->input('password'));
        $newUser->setUserType($request->input('user_type'));
        $newUser->save();

        return redirect()->route('user.index');
    }

    public function edit($id) 
    {
        $viewData['user'] = User::findOrFail($id);
        
        return view('user.edit')->with('viewData', $viewData);
    }

    public function update(Request $request, $id) 
    {
        $user = User::findOrFail($id);
        $user->setName($request->input('name'));
        $user->setEmail($request->input('email'));
        $newUser->setPassword($request->input('password'));
        $user->setUserType($request->input('user_type'));

        return redircet()->route('user.index');
    }

    public function delete($id) 
    {
        $user = User::find($id);
        $user->delete();

        return back();
    }
}