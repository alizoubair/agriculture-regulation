@extends('layouts.index')
@section('index')
    <div class="page-content">
        <div class="sidebar-content">
            <div class="btns">
                <a class="farms" href=" {{ route('admin.farm.index') }}" style="background: #EEF5EC; color: #ACB4AB">Fermes</a>
                <a class="greenhouses" href=" {{ route('admin.greenhouse.index') }}" style="background: #78B044; color: #FFFFFF">Serres</a>
            </div>
            <div>
                <input id="search" class="searchGreenhouse" type="text" placeholder="recherche par serre">

                <div id="dropdown-greenhouses" class="dropdown">
                    <table id="idGreenhouse" class="dropdown-content datatable" style="width: 100%">
                        <tbody id="greenhouse">
                        </tbody>
                    </table>
                </div>
            </div>
            <a id="changeBtn" href="greenhouses/create">Ajouter une Serre</a>
        </div>
        <div id="map"></div>
    </div>
@endsection
@section('javascripts')
    <script type="module" src="{{ asset('js/mapbox.js') }}"></script>
    <script type="module" src="{{ asset('js/greenhouse.js') }}"></script>
    <script>
        $(document).ready(function() {
            var table = $('.datatable').DataTable({
                'scrollY': '400px',
                'scrollCollapse': true,
                'serverSide': true,
                'ajax': {
                    url: "{{ route('admin.greenhouse.index') }}",
                    data: function(d) {
                        d.name = $('#search').val()
                    }
                },
                'columns': [
                    {'data': 'name'},
                    {
                        'class': 'area',
                        data: 'area',
                        render: function(data) {
                            return 'Surface: ' + data;
                        }
                    },
                    {
                        'class': 'perimeter',
                        data: 'perimeter',
                        render: function(data) {
                            return 'Périmètre: ' + data;
                        }
                    },
                    {
                        'class': 'farmId',
                        data : 'farmId',
                        render: function(data) {
                            return 'Ferme: ' + data;
                        }
                    },
                    {
                        'class' :'coordinates',
                        data : 'coordinates',
                    },
                    {
                        'class': 'action',
                        'data': 'action',
                        'name': 'action',
                        searchable: false
                    }
                ],
                'columnDefs': [
                    {
                        'targets': 4,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'coordinates'); 
                        }
                    }
                ],
                "language": {
                    "zeroRecords": 'Aucune serre disponible',
                }
            });

            $('#search').keyup(function() {
                table.draw();
            })
        })
    </script>
@endsection