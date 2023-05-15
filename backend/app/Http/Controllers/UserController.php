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

    public function followers(string $name){
        $user = User::where('name',$name)->first();
        $followers = $user->followers->sortByDesc('created_at');

        return [
            'user'=>$user,
            'followers' => $followers
        ];
    }

    public function followees(string $name){
        $user = User::where('name',$name)->first();
        $followees = $user->followees->sortByDesc('created_at');

        return [
            'user'=>$user,
            'followees' => $followees
        ];
    }

    public function follow(Request $request,string $name){
        $user = User::where('name',$name)->first();

        // if($user->id === $request->user()->id){
        //     return abort('404', 'Cannot follow yourself.');
        // }

        $request->user()->followees()->detach($user);
        $request->user()->followees()->attach($user);

        return ['name'=>$name];
    }

    public function unfollow(Request $request,string $name){
        $user = User::where('name',$name)->first();

        $request->user()->followees()->detach($user);

        return ['name'=>$name];
    }
}
