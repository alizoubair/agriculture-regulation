@extends('layouts.index')

@section('Farm')
<div class="sidebar-content">
    <a class="main-title">Créer une nouvelle ferme</a>
    <div class="info">
        <a id="cancelBtn" href="/admin/farms">
            <i class="bi bi-arrow-left"></i>
            <span>Annuler</span>
        </a>
        
        <p>Dessinez le périmètre de votre ferme.</p>

        <form id="form" method="POST" action="{{ route('admin.farm.create') }}">
        @csrf
            <label>Name:</label>
            <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control" placeholder="Entre le nom de la ferme">
            <label>Area:</label>
            <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control" placeholder="__ km">
            <label>Perimeter:</label>
            <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control" placeholder="__ m">
            <input id="coordinates" trype="text" name="coordinates" style="display: none" >
            <input id="zoom" type="text" name="zoom" style="display: none">
            <input id="center" type="text" name="center" style="display: none">
        </form>
    </div>
    <button id="changeBtn" type="submit" form="form">Enregistrer</button>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/draw_polygon.js') }}"></script>
@endsection
