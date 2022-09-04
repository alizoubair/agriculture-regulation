@extends('layouts.index')

@section('Greenhouse')
<div class="sidebar-content">
<button id="cancel-greenhouse"><a href="/admin">Annuler</a></button>

<form method="POST" action="{{ route('admin.greenhouse.create') }}">
    @csrf
    <div>
        <label>Name:</label>
        <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control">
    </div>
    <div>
        <label>Ferme</label>

        <select id="select" class="dropdown-fermes" name="farm_id">
            <option value="" selected>selectioner une ferme</option>
            @foreach($viewData['farms'] as $farm)
            <option value="{{ $farm->getId() }}" data-center="{{ $farm->getCenter() }}" data-zoom="{{ $farm->getZoomLevel() }}" data-coordinates="{{ $farm->getCoordinates() }}">{{ $farm->getName() }}</option>
            @endforeach
        </select>
    </div>
    <div>
        <label>Area:</label>
        <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control">
    </div>
    <div>
        <label>Perimeter:</label>
        <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control">
    </div>
    <input id="lng" type="text" name="lng" style="display: none">
    <input id="lat" type="text" name="lat" style="display: none">
    <input id="coordinates" trype="text" name="coordinates" style="display: none" >
    <input id="zoom" type="text" name="zoom" style="display: none">
    <input id="center" type="text" name="center" style="display: none">
    <button type="submit">Enregistrer</button>
</form>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/draw_polygon.js') }}"></script>
@endsection