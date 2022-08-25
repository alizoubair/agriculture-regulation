@extends('layouts.index')

@section('Farm')
<div class="sidebar-content">
    <button id="cancel-farm"><a href="/admin">Annuler</a></button>

    <form method="POST" action="{{ route('admin.farm.create') }}">
        @csrf
        <label>Name:</label>
        <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control">
        <label>Area:</label>
        <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control">
        <label>Perimeter:</label>
        <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control">
        <input id="lng" type="text" name="lng" style="display: none">
        <input id="lat" type="text" name="lat" style="display: none">
        <input id="zoom" type="text" name="zoom" style="display: none">

        <button type="submit">Save</button>
    </form>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/script.js') }}"></script>

@endsection
