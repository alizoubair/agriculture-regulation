@extends('layouts.index')

@section('header')
<h1>Utilisateur</h1>
<a href="/user/create">Ajouter un Utilisateur</a>
@endsection

@section('user')
<div class="index-user">
    <div class="filter">
        <div>
            <label>Utilisateur</label>
            <select class="searchUser">
                <option>Recherche par utilisateur</option>
                <option>SOMEONE</option>
            </select>
        </div>
        
        <div>
            <label>Rôle</label>
            <select class="searchUserType">
                <option>Recherche par rôle</option>
                <option>Responsable</option>
            </select>
        </div>

        <button id="filter">Filter</button>
    </div>
    <table id="userFilter" class="datatable" style="width: 100%">
        <thead class="thead">
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody class="tbody">
        </tbody>
    </table>
</div>
@endsection

@section('javascripts')
    <script>
        $(document).ready(function() {
            var table = $('.datatable').DataTable({
                "pageLength": 5,
                'processing': true,
                'serverSide': true,
                'ajax': {
                    url: "{{ route('user.index') }}",
                    data: function (d) {
                        d.name = $('.searchUser').val()
                    }
                },
                
                'columns': [
                    {'data': 'name'},
                    {'data': 'email'},
                    {'data': 'user_type'}
                ]
            });

            $('#filter').on('click', function () {
                table.draw();
            });
        });
    </script>
@endsection('javascripts')