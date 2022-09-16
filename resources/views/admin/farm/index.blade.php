@extends('layouts.index')
@section('header')
    <h1>Carte des fermes</h1>
@endsection

@section('index')
    <div class="page-content">
        <div class="sidebar-content">
            <div class="btns">
                <a class="farms" href="/admin/farms" style="background: #78B044">Fermes</a>
                <a class="greenhouses" href="/admin/greenhouses" style="background: #EEF5EC">Serres</a>
            </div>
            <div>
                <div id="search">
                    <input id="inputSearch" class="searchFarm" name="searchFarm" type="text" placeholder="recherche par ferme">
                    <i class="bi bi-search"></i>
                </div>
                <div id="dropdown-farms" class="dropdown-content">
                    <table id="idFarm" class="dropdown-content datatable" style="width: 100%;">
                        <tbody id="farms">    
                        </tbody>
                    </table>
                </div>
            </div>
            <a id="changeBtn" href="/admin/farms/create">Ajouter une ferme</a>
        </div>
        <div id="map"></div>   
    </div>
@endsection

@section('javascripts')
    <script type="module" src="{{ asset('js/mapbox.js') }}"></script>
    <script type="module" src="{{ asset('js/farm.js') }}"></script>
    <script>
        $(document).ready(function () {
            var table = $('.datatable').DataTable({
                'scrollY': '450px',
                'scrollCollapse': true,
                'serverSide': true,
                'ajax': {
                    url: "{{ route('admin.farm.index') }}",
                    data: function (d) {
                        d.name = $('#inputSearch').val()
                    }
                },
                'columns': [
                    {
                        class: 'name',
                        data: 'name',
                        name: 'name',
                        orderable: false,
                        searchable: false
                    },
                    {
                        'class': 'area',
                        data: 'area',
                        render: function (data) {
                            return 'Surface: ' + data;
                        }
                    },
                    {
                        'class': 'perimeter',
                        data: 'perimeter',
                        render: function (data) {
                            return 'Périmètre: ' + data;
                        }
                    },
                    {
                        'class': 'coordinates',
                        data: 'coordinates'
                    },
                    {
                        'class': 'center',
                        data: 'center'
                    },
                    {
                        'class': 'zoom',
                        data: 'zoom'
                    },
                    {
                        'class': 'action',
                        'data': 'action',
                        'name': 'action',
                        orderable: false,
                        searchable: false
                    }
                ],
                'columnDefs': [
                    {
                        'targets': 1,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'area');
                        }
                    },
                    {
                        'targets': 2,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'perimeter');
                        }
                    },
                    {
                        'targets': 3,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'coordinates');
                        }
                    },
                    {
                        'targets': 4,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'center');
                        }
                    },
                    {
                        'targets': 5,
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'zoom');
                        }
                    }
                ],
                "language": {
                    "zeroRecords": 'Aucune ferme disponible',
                }
            });

            $('#search').keyup(function () {
                table.draw();
            });

            console.log(table)
        })
   </script>
@endsection