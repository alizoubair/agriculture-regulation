@extends('layouts.index')
@section('header')
    <h1>Carte des fermes</h1>
@endsection

@section('Greenhouse')
    <div class="page-content">
            <div class="sidebar-content">
            <a class="main-title">Editer une serre</a>
            <div class="info">
                <a id="cancelBtn" href="/admin/greenhouses">
                    <i class="bi bi-arrow-left"></i>
                    <span>Annuler</span>
                </a>
                <form id="form" method="POST" action="{{ route('admin.greenhouse.update', ['id'=>$viewData['greenhouse']->getId()]) }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div>
                        <label>Ferme</label>

                        <select class="dropdown-fermes" name="farm_id">
                            <option value="" selected>sélectionner une ferme</option>
                            @foreach($farmData['farms'] as $farm)
                            <option id="farm_id" value="{{ $farm->getId() }}">{{ $farm->getName() }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label>Name:</label>
                        <input id="name" type="text" name="name" value="{{ $viewData['greenhouse']->getName() }}" class="form-control">
                    </div>
                    <div>
                        <label>Area:</label>
                        <input id="calculated-area" type="text" name="area" value="{{ $viewData['greenhouse']->getArea() }}" class="form-control">
                    </div>
                    <div>  
                        <label>Perimeter:</label>
                        <input id="calculated-perimeter" type="text" name="perimeter" value="{{ $viewData['greenhouse']->getPerimeter() }}" class="form-control">
                    </div>
                    <div>
                        <input id="coordinates" type="text" name="coordinates" value="{{ $viewData['greenhouse']->getCoordinates() }}" style="display: none">
                    </div>
                    <div>
                        <input id="center" type="text" name="center" value="{{ $viewData['greenhouse']->getCenter() }}" style="display: none">
                    </div>
                    <div>
                        <input id="zoom" type="text" name="zoom" value="{{ $viewData['greenhouse']->getZoomLevel() }}" style="display: none">
                    </div>
                </form>
            </div>
            <button id="changeBtn" type="submit" form="form">Enregistrer</button>
        </div>
        <div id="map"></div>
    </div>
@endsection

@section('javascripts')
    <script type="module" src="{{ asset('js/mapbox.js') }}"></script>
    <script type="module" src="{{ asset('js/create_polygon.js') }}"></script>
@endsection
