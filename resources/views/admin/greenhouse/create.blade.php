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
        <input id="farm_id" type="text" name="farm_id" value="{{ old('name') }}" class="form-control">

        <div class="dropdown-fermes">
            
            <a href="#">A</a>
        </div>
    </div>
    <div>
        <label>Area:</label>
        <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control">
    </div>
    <div>
        <label>Perimeter:</label>
        <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control">
    </div>
    <button type="submit">Save</button>
</form>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/script.js') }}"></script>

@endsection