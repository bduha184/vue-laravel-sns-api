<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class UserController extends Controller
{

    public function show() {
        $users =  User::all();

        $articles = $users->each(function($e){
            $e->articles->sortByDesc('created_at');
        });
        // $articles = $users->articles->sortByDesc('crated_at');

        return [
            // 'users'=>$users,
            'articles'=>$articles
        ];
    }

    public function followers($id){
        $user = User::where('id',$id)->first();
        $followers = $user->followers->sortByDesc('created_at');

        return [
            'user'=>$user,
            'followers' => $followers
        ];
    }

    public function followees($id){
        $user = User::where('id',$id)->first();
        $followees = $user->followees->sortByDesc('created_at');

        return [
            'user'=>$user,
            'followees' => $followees
        ];
    }

    public function follow(Request $request, $id){
        $user = User::where('id',$id)->first();

        // if($user->id === $request->user()->id){
        //     return abort('404', 'Cannot follow yourself.');
        // }

        $request->user()->followees()->detach($user);
        $request->user()->followees()->attach($user);

        return ['id'=>$id];
    }

    public function unfollow(Request $request, $id){
        $user = User::where('name',$id)->first();

        $request->user()->followees()->detach($user);

        return ['id'=>$id];
    }

    public function likes($id){
        $user = User::where('id',$id)->first();

        $articles = $user->likes->get();

        return [
            'user'=>$user,
            'articles'=>$articles,
        ];
    }
}
