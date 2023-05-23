<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Article::latest()->with('user')->with('tags')->with('likes')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request, Article $article)
    {

        $article->fill($request->all());
        $article->user_id = Auth::id();
        $article->save();


        collect($request->tags)->each(function($tagName) use ($article){
            $tag = Tag::firstOrCreate(['name'=>$tagName]);
            $article->tags()->attach($tag);
        });

        // return $request->tags;
        return response()->json([
            'message' => 'created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article ,$id)
    {
        return $article->where('id',$id)->with('user')->with('likes')->with('tags')->first();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, $id)
    {
        $article = Article::find($id);
       if($article) {

            $article->fill($request->all())->save();
           return response()->json([
               'message' => 'update successfully'
           ], Response::HTTP_OK);
       }

    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $article = Article::find($id);
        if($article){
            $article->delete();
            return response()->json([
                'message' => 'update successfully'
            ], Response::HTTP_OK);
        }else {
            return response()->json([
                'message' => 'Article not found'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function like(Request $request,$id){

        $article = Article::find($id)->likes();
        $article->detach($request->user()->id);
        $article->attach($request->user()->id);
    }

    // public function likes($id){
    //     $user = User::where('id',$id)->first();

    //     // $articles =Article::where('id',$user->likes)->latest()->get();

    //     $test = $user->likes;

    //     return [
    //         // 'user'=>$user,
    //         // 'articles'=>$articles,
    //         'test'=>$test
    //     ];
    // }
}
