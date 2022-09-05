@extends('layouts.index')
@section('index')
<div class="sidebar-content" style="display: block;">
    <div class="btns">
        <a id="farms" href=" {{ route('admin.farm.index') }}" style="background: #EEF5EC; color: #ACB4AB">Fermes</a>
        <a id="greenhouses" href=" {{ route('admin.greenhouse.index') }}" style="background: #78B044; color: #FFFFFF">Serres</a>
    </div>
      <div>
            <input class="typeahead form-control" id="search" type="text" placeholder="recherche par serre">

            <div id="dropdown-greenhouses" class="dropdown">
                <div id="idGreenhouse" class="dropdown-content">
                    @foreach($viewData['greenhouses'] as $greenhouse)
                    <div id="greenhouse">
                        <div id="container">
                            <a id="{{ $greenhouse->getId() }}" class="showGreenhouse" href="#">{{ $greenhouse->getName()}}</a>
                            <input id="zoom" type="text" name="zoom" value="{{ $greenhouse->getZoomLevel() }}" style="display: none;">
                            <input type="text" name="center" value="{{ $greenhouse->getCenter() }}" style="display: none">
                            <input type="text"  name="coordinates" value="{{ $greenhouse->getCoordinates() }}" style="display: none;" > 
                            <form action="{{ route('admin.greenhouse.delete', $greenhouse->getId()) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button id="deleteBtn" type="submit"><i class="bi bi-trash-fill"></i></button>
                            </form>
                            <a href="{{route('admin.greenhouse.edit', ['id'=> $greenhouse->getId()])}}"><i class="bi bi-pencil-fill"></i></a>
                        </div>
                    </div>
                    
                    @endforeach
                </div>

                <a id="createBtn" href="greenhouses/create">Ajouter une Serre</a>
            </div>
      </div>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/mapbox.js') }}"></script>
<script type="module" src="{{ asset('js/greenhouse.js') }}"></script>
@endsection