<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Article::latest()->with('user')->get();
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
        $article->user_id = 13;
        // $article->user_id = $request->user()->id;
        $article->save();

        return response()->json([
            'message' => 'created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
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
}
