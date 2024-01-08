<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebMemberController;

Route::get('/', [WebMemberController::class, 'index']);
