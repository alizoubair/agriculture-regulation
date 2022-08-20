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

        <select class="dropdown-fermes" name="farm_id">
            @foreach($viewData['farms'] as $farm)
            <option id="farm_id" value="{{ $farm->getId() }}">{{ $farm->getName() }}</option>
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
    <button type="submit">Save</button>
</form>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/script.js') }}"></script>

@endsection