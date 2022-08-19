@extends('layouts.index')
@section('index')
<div id="content" style="display: block;">
    <div class="btns">
        <button id="farms" class="dropbtn">Fermes</button>
        <button id="greenhouses" class="dropbtn">Serres</button>
    </div>
      <div class="dropdown">
             <div id="dropdown-farms">
                <div class="dropdown-content">
                     @foreach($viewData['farms'] as $farm)
                     <a>{{ $farm->getName() }}</a>
                     @endforeach
                </div>

                 <button id="btnFarm"><a href="admin/farms/create">Créer une nouvelle ferme</a></button>
             </div>

             <div id="dropdown-greenhouses" style="display: none;">
                <div class="dropdown-content">
                    <a href="#">Serre 1</a>
                    <a href="#">Serre 2</a>
                    <a href="#">Serre 3</a>
                </div>

                <button id="btnGreenhouse"><a href="admin/greenhouses/create">Créer une nouvelle Serre</a></button> 
            </div>
      </div>
</div>
<div id="map"></div>
<pre id="coordinates" class="coordinates"></pre>
<script type="module" src="{{ asset('js/map.js') }}"></script>
@endsection