@extends('layouts.index')

@section('header')
<h1>Utilisateur</h1>
<a id="redirect" href="/user">Retour</a>
@endsection

@section('user')
<div class="create-user">
    <div class="register">
        <a class="title">Ajouter un utilisateur</a>
        <form method="POST" action="{{ route('user.create') }}">
            @csrf
            <div>
                <label>Nom et prénom *</label>
                <input name="name" placeholder="Nom et prénom">
            </div>
            <div>
                <label>Adresse email *</label>
                <input name="email" placeholder="Adresse email">
            </div>
            <div>
                <label>Mot de passe</label>
                <input name="password" placeholder="Mot de passe">
            </div>
            <div>
                <label>Role *</label>
                <input name="user_type" placeholder="Role">
            </div>

            <button type="submit">Enregistrer</button>
        </form>
    </div>
</div>
@endsection