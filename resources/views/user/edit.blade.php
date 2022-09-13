@extends('layouts.index')

@section('header')
<h1>Utilisateur</h1>
<a id="redirect" href="/user">Retour</a>
@endsection

@section('user')
<div class="edit-user">
    <div class="user-info">
        <a class="title">Modifier les informations de l'utilisateur</a>
        <form>
            <div>
                <label>Nom et prénom *</label>
                <input placeholder="Nom et prénom">
            </div>
            <div>
                <label>Adresse email *</label>
                <input placeholder="Adresse email">
            </div>
            <div>
                <label>Role *</label>
                <input placeholder="Role">
            </div>

            <button type="submit">Enregistrer</button>
        </form>
    </div>
    <div class="password">
        <a class="title">Changer le mot de passe</a>
        <form>
            <div>
                <label>Nouveau mot de passe *</label>
                <input placeholder="Nouveau mot de passe">
            </div>
            <div>
                <label>Confirmez le mot de passe *</label>
                <input placeholder="Confirmez le mot de passe">
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    </div>
</div>
@endsection