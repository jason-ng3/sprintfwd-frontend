<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WebMemberController extends Controller
{
    public function index()
        {
            $response = Http::get('http://localhost:8000/api/members');
            $members = $response->json()['members'];

            $response = Http::get('http://localhost:8000/api/teams');
            $teams = $response->json()['teams'];
        
            return view('dashboard', [
                'members' => $members,
                'teams' => $teams,
            ]);
        }
}
