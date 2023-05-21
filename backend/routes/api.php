<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/{id}/follow',[UserController::class,'follow']);
    Route::delete('/user/{id}/follow',[UserController::class,'unfollow']);
    Route::post('/articles',[ArticleController::class,'store']);
    Route::put('/articles/{id}',[ArticleController::class,'update']);
    Route::delete('/articles/{id}',[ArticleController::class,'destroy']);
    Route::put('/articles/{id}/like',[ArticleController::class,'like']);
    Route::delete('/articles/{id}/unlike',[ArticleController::class,'unlike']);
});


Route::post('/register',[RegisterController::class,'register']);
Route::post('/logout',[LoginController::class,'logout']);

Route::prefix('login')->group(function () {
    Route::post('/login',[LoginController::class,'login']);
    Route::get('/{provider}', [LoginController::class,'redirectToProvider']);
});

Route::get('/articles',[ArticleController::class,'index']);
Route::get('/articles/{id}',[ArticleController::class,'show']);
Route::get('/articles/{id}/likes',[ArticleController::class,'likes']);

Route::get('/users',[UserController::class,'show']);
Route::get('/user/{id}/followers',[UserController::class,'followers']);
Route::get('/user/{id}/followees',[UserController::class,'followees']);
Route::get('/user/{id}/likes',[UserController::class,'likes']);
