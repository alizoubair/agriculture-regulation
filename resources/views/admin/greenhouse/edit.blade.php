@extends('layouts.index')

@section('Greenhouse')
<div class="sidebar-content">
    <a class="main-title">Editer une serre</a>
    <div class="info">
        <a id="cancelBtn" href="/admin/greenhouses">
            <i class="bi bi-arrow-left"></i>
            <span>Annuler</span>
        </a>
        <form method="POST" action="{{ route('admin.greenhouse.update', ['id'=>$viewData['greenhouse']->getId()]) }}" enctype="multipart/form-data">
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
                <input id="zoom" type="text" name="zoom" value="{{ $viewData['greenhouse']->getZoomLevel() }}" style="display: none">
            </div>
            <div>
                <input id="coordinates" type="text" name="coordinates" value="{{ $viewData['greenhouse']->getCoordinates() }}" style="display: none">
            </div>
        </form>
    </div>
    <button id="changeBtn" type="submit">Enregistrer</button>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/mapbox.js') }}"></script>
<script type="module" src="{{ asset('js/create_polygon.js') }}"></script>
@endsection
