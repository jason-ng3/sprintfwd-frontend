@extends('layouts.app')

@section('content')
    @include('member.index', ['members' => $members])
    @include('team.index', ['teams' => $teams])
@endsection