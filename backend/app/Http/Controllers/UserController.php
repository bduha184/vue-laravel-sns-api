<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    //

    public function store(Request $request){
        User::create($request->all());
        return response()->json([
            'message'=>'register successfully',
        ],Response::HTTP_CREATED);
    }
}
