<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class UserController extends Controller
{

    public function show($name) {
        return User::where('name',$name)->first();
        return response()->json([
            'message'=>'User select successfully'
        ],Response::HTTP_OK);
    }
}
