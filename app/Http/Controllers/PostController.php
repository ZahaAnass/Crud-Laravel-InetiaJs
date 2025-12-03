<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('posts/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:255",
            "content" => "required|string",
            "status" => "required|string",
            "category" => "required|string",
            "image" => "required|image|max:8064",
        ]);

        $file = $request->file('image');
        $uniqueFileName = uniqid() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('posts', $uniqueFileName, 'public');

        $slug = Str::slug($request->title);
        $slugExists = Post::where('slug', $slug)->exists();
        if ($slugExists) {
            $slug .= '-' . uniqid();
        }

        $post = Post::create([
            "user_id" => auth()->id(),
            "title" => $request->title,
            "slug" => Str::slug($slug),
            "content" => $request->input('content'),
            "status" => $request->status,
            "category" => $request->category,
            "image" => $filePath,
        ]);

        return redirect()->route('posts.index')->with('message', 'Post created; successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
