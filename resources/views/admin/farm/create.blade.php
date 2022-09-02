@extends('layouts.index')

@section('Farm')
<div class="sidebar-content">
    <div class="main-title">
        <p>créer une nouvelle ferme</p>
    </div>
    <button id="cancelBtn"><a href="/admin">
        <i class="bi bi-arrow-left"></i>
        <span>Annuler</span>
    </a></button>
    <div>
        <p>Dessinez le périmètre de votre nouveau ferme.</p>

        <form method="POST" action="{{ route('admin.farm.create') }}">
        @csrf
            <label>Name:</label>
            <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control" placeholder="Entre le nom de la ferme">
            <label>Area:</label>
            <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control" placeholder="__ km">
            <label>Perimeter:</label>
            <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control" placeholder="__ m">
            <input id="lng" type="text" name="lng" style="display: none">
            <input id="lat" type="text" name="lat" style="display: none">
            <input id="coordinates" trype="text" name="coordinates" style="display: none" >
            <input id="zoom" type="text" name="zoom" style="display: none">
            <input id="center" type="text" name="center" style="display: none">
            
            <button id="createBtn" type="submit">Enregistrer</button>
        </form>
        <div class="line"></div>
    </div>
    
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/script.js') }}"></script>

@endsection
