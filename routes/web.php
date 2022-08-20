<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/admin', [App\Http\Controllers\Admin\AdminHomeController::class, 'index'])->name('admin.home.index');

Route::get('/admin', [App\Http\Controllers\Admin\AdminFarmController::class, 'index'])->name('admin.farm.index');

Route::get('/admin/farms/create', [App\Http\Controllers\Admin\AdminFarmController::class, 'display'])->name("admin.farm.create");

Route::post('/admin/farms/create', [App\Http\Controllers\Admin\AdminFarmController::class, 'create'])->name("admin.farm.create");

Route::delete('/admin/farms/{id}/delete', [App\Http\Controllers\Admin\AdminFarmController::class, 'delete'])->name("admin.farm.delete");

Route::get('/admin/greenhouses/create', [App\Http\Controllers\Admin\AdminGreenhouseController::class, 'display'])->name("admin.greenhouse.create");

Route::post('/admin/greenhouses/create', [App\Http\Controllers\Admin\AdminGreenhouseController::class, 'create'])->name("admin.greenhouse.create");

Route::delete('/admin/greenhouses/{id}/delete', [App\Http\Controllers\Admin\AdminGreenhouseController::class, 'delete'])->name("admin.greenhouse.delete");

Route::get('/admin/greenhouses/{id}/edit', [App\Http\Controllers\Admin\AdminGreenhouseController::class, 'edit'])->name("admin.greenhouse.edit");

Route::put('/admin/greenhouses/{id}/update', [App\Http\Controllers\Admin\AdminGreenhouseController::class, 'update'])->name("admin.greenhouse.update");