@extends('layouts.index')
@section('index')
<div class="sidebar-content" style="display: block;">
    <div class="btns">
        <button id="farms" class="dropbtn">Fermes</button>
        <button id="greenhouses" class="dropbtn">Serres</button>
    </div>
      <div class="dropdown">
             <div id="dropdown-farms">
                <div id="idFarm" class="dropdown-content">
                     @foreach($farmData['farms'] as $farm)
                     <div>
                        <a>{{ $farm->getName() }}</a>
                        <input id="lng" type="text" name="lng" value="{{ $farm->getLongitude() }}" style="display: none;">
                        <input id="lat" type="text" name="lat" value="{{ $farm->getLatitude() }}" style="display: none">
                         <form action="{{ route('admin.farm.delete', $farm->getId()) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Supprimer</button>
                         </form>
                         <a href="{{route('admin.farm.edit', ['id'=> $farm->getId()])}}">Editer</a>
                     </div>
                     @endforeach
                </div>

                 <button id="btnFarm"><a href="farms/create">Créer une nouvelle ferme</a></button>
             </div>

             <div id="dropdown-greenhouses" style="display: none;">
                <div id="idGreenhouse" class="dropdown-content">
                    @foreach($greenhouseData['greenhouses'] as $greenhouse)
                    <div>
                        <a>{{ $greenhouse->getName()}}</a>
                         <form action="{{ route('admin.greenhouse.delete', $greenhouse->getId()) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Supprimer</button>
                         </form>
                         <a href="{{route('admin.greenhouse.edit', ['id'=> $greenhouse->getId()])}}">Editer</a>
                     </div>
                    @endforeach
                </div>

                <button id="btnGreenhouse"><a href="admin/greenhouses/create">Créer une nouvelle Serre</a></button> 
            </div>
      </div>
</div>
<div id="map"></div>
<pre id="coordinates" class="coordinates"></pre>
<script type="module" src="{{ asset('js/map.js') }}"></script>
@endsection