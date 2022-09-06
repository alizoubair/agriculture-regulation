@extends('layouts.index')
@section('index')
<div class="sidebar-content">
    <div class="btns">
        <a id="farms" href="/admin/farms" style="background: #78B044">Fermes</a>
        <a id="greenhouses" href="/admin/greenhouses" style="background: #EEF5EC">Serres</a>
    </div>
    <div>
        <input class="typeahead form-control" id="search" type="text" placeholder="recherche par ferme">
        <div id="dropdown-farms" class="dropdown">
            <div id="idFarm" class="dropdown-content">
                @foreach($farmData['farms'] as $farm)
                <div id="farm">
                    <div id="container">
                        <a id="{{ $farm->getId() }}" class="showFarms" href="#">{{ $farm->getName() }}</a>
                        <a id="updateBtn" href="{{route('admin.farm.edit', ['id'=> $farm->getId()])}}"><i class="bi bi-pencil-fill"></i></a>
                        <form action="{{ route('admin.farm.delete', $farm->getId()) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button id="deleteBtn" type="submit"><i class="bi bi-trash-fill"></i></button>
                        </form>
                        <div class="dimensions">
                            <p class="perimeter">Périmètre: {{ $farm->getPerimeter() }} m</p> 
                            <p class="area">Surface: {{ $farm->getArea() }} m</p>
                        </div>
                        <input id="lng" type="text" name="lng" value="{{ $farm->getLongitude() }}" style="display: none;">
                        <input id="lat" type="text" name="lat" value="{{ $farm->getLatitude() }}" style="display: none">
                        <input id="zoom" type="text" name="zoom" value="{{ $farm->getZoomLevel() }}" style="display: none;">
                        <input id="center" type="text" name="center" value="{{ $farm->getCenter() }}" style="display: none">
                        <input id="coordinates" type="text"  name="coordinates" value="{{ $farm->getCoordinates() }}" style="display: none;" >
                    </div> 
                </div>
                @endforeach
            </div>
        </div>
    </div>
    <a id="changeBtn" href="/admin/farms/create">Ajouter une ferme</a>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/mapbox.js') }}"></script>
<script type="module" src="{{ asset('js/farm.js') }}"></script>
@endsection