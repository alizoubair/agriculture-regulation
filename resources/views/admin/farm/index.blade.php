@extends('layouts.index')
@section('index')
<div class="sidebar-content" style="display: block;">
    <div class="btns">
        <button id="farms" class="dropbtn">Fermes</button>
        <button id="greenhouses" class="dropbtn">Serres</button>
    </div>
      <div>
            <input class="typeahead form-control" id="search" type="text" placeholder="recherche par ferme">
            <div id="dropdown-farms" class="dropdown">
                <div id="idFarm" class="dropdown-content">
                    @foreach($farmData['farms'] as $farm)
                    <div id="farm">
                        <div id="farm-container">
                            <a id="{{ $farm->getId() }}" href="#">{{ $farm->getName() }}</a>
                            <button id="updateBtn"><a href="{{route('admin.farm.edit', ['id'=> $farm->getId()])}}"><i class="bi bi-pencil-fill"></i></a></button>
                            <form action="{{ route('admin.farm.delete', $farm->getId()) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button id="deleteBtn" type="submit"><i class="bi bi-trash-fill"></i></button>
                            </form>
                            <p class="perimeter">Périmètre: {{ $farm->getPerimeter() }} m</p> 
                            <p class="area">Surface: {{ $farm->getArea() }} m</p>
                            <input id="lng" type="text" name="lng" value="{{ $farm->getLongitude() }}" style="display: none;">
                            <input id="lat" type="text" name="lat" value="{{ $farm->getLatitude() }}" style="display: none">
                            <input id="zoom" type="text" name="zoom" value="{{ $farm->getZoomLevel() }}" style="display: none;">
                            <input type="text" name="center" value="{{ $farm->getCenter() }}" style="display: none">
                            <input type="text"  name="coordinates" value="{{ $farm->getCoordinates() }}" style="display: none;" >
                        </div> 
                    </div>
                    @endforeach
                </div>

                <button id="createBtn"><a href="admin/farms/create">Ajouter une ferme</a></button>
            </div>

            <div id="dropdown-greenhouses" class="dropdown" style="display: none;">
                <div id="idGreenhouse" class="dropdown-content">
                    @foreach($greenhouseData['greenhouses'] as $greenhouse)
                    <div id="greenhouse">
                        <div id="greenhouse-container">
                            <a id="{{ $greenhouse->getId() }}" href="#">{{ $greenhouse->getName()}}</a>
                            <input id="zoom" type="text" name="zoom" value="{{ $greenhouse->getZoomLevel() }}" style="display: none;">
                            <input type="text" name="center" value="{{ $greenhouse->getCenter() }}" style="display: none">
                            <input type="text"  name="coordinates" value="{{ $greenhouse->getCoordinates() }}" style="display: none;" > 
                            <form action="{{ route('admin.greenhouse.delete', $greenhouse->getId()) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button id="deleteBtn" type="submit">Supprimer</button>
                            </form>
                            <a href="{{route('admin.greenhouse.edit', ['id'=> $greenhouse->getId()])}}">Editer</a>
                        </div>
                    </div>
                    
                    @endforeach
                </div>

                <button id="createBtn"><a href="admin/greenhouses/create">Ajouter une Serre</a></button> 
            </div>
      </div>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/map.js') }}"></script>
@endsection