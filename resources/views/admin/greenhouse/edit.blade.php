@extends('layouts.index')

@section('Farm')
<div class="sidebar-content">
    <button id="cancel-farm"><a href="/admin">Annuler</a></button>

    <form method="POST" action="{{ route('admin.greenhouse.update', ['id'=>$viewData['greenhouse']->getId()]) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div>
            <label>Name:</label>
            <input id="name" type="text" name="name" value="{{ $viewData['greenhouse']->getName() }}" class="form-control">
        </div>
        <div>
            <label>Ferme</label>

            <select class="dropdown-fermes" name="farm_id">
                @foreach($farmData['farms'] as $farm)
                <option id="farm_id" value="{{ $farm->getId() }}">{{ $farm->getName() }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label>Area:</label>
            <input id="calculated-area" type="text" name="area" value="{{ $viewData['greenhouse']->getArea() }}" class="form-control">
        </div>
        <div>  
            <label>Perimeter:</label>
            <input id="calculated-perimeter" type="text" name="perimeter" value="{{ $viewData['greenhouse']->getPerimeter() }}" class="form-control">
        </div>
        <button type="submit">Save</button>
    </form>
</div>
<div id="map"></div>
<script type="module" src="{{ asset('js/script.js') }}"></script>

@endsection
