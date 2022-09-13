@extends('layouts.index')
@section('header')
<h1>Carte des fermes</h1>
@endsection

@section('Farm')
<div class="page-content">
    <div class="sidebar-content">
        <a class="main-title">Editer une ferme</a>
        <div class="info">
            <a id="cancelBtn" href="/admin/farms">
                <i class="bi bi-arrow-left"></i>
                <span>Annuler</span>
            </a>

            <p>Dessinez le périmètre de votre ferme.</p>

            <form method="POST" action="{{ route('admin.farm.update', ['id'=>$viewData['farm']->getId()]) }}" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div>
                    <label>Name:</label>
                    <input id="name" type="text" name="name" value="{{ $viewData['farm']->getName() }}" class="form-control">
                </div>
                <div>
                    <label>Area:</label>
                    <input id="calculated-area" type="text" name="area" value="{{ $viewData['farm']->getArea() }}" class="form-control">
                </div>
                <div>  
                    <label>Perimeter:</label>
                    <input id="calculated-perimeter" type="text" name="perimeter" value="{{ $viewData['farm']->getPerimeter() }}" class="form-control">
                </div>
                <div>
                    <input id="zoom" type="text" name="zoom" value="{{ $viewData['farm']->getZoomLevel() }}" style="display: none">
                </div>
                <div>
                    <input id="coordinates" type="text" name="coordinates" value="{{ $viewData['farm']->getCoordinates() }}" style="display: none">
                </div>
            </form>
        </div>
        <button id="changeBtn" type="submit">Enregistrer</button>
    </div>
    <div id="map"></div>
</div>

<script type="module" src="{{ asset('js/create_polygon.js') }}"></script>
@endsection
