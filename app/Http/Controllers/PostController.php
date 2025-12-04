<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use \Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Auth::user()->posts()->latest();
        if ($request->has("search") && $request->search !== null) {
            $query->whereAny(["title", "content"], "like", "%" . $request->search . "%");
        }
        $posts = $query->paginate(5)->withQueryString();
        return Inertia::render('posts/index', [
            "posts" => $posts
        ]);
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
        return Inertia::render('posts/edit', [
            "postData" => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            "title" => "required|string|max:255",
            "content" => "required|string",
            "status" => "required|string",
            "category" => "required|string",
            "image" => "nullable|image|max:8064",
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $uniqueFileName = uniqid() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('posts', $uniqueFileName, 'public');
            $post->image = $filePath;
        }

        $slug = Str::slug($request->title);
        if ($slug !== $post->slug) {
            $slugExists = Post::where('slug', $slug)->where('id', '!=', $post->id)->exists();
            if ($slugExists) {
                $slug .= '-' . uniqid();
            }
            $post->slug = $slug;
        }

        $post->title = $request->title;
        $post->content = $request->input('content');
        $post->status = $request->status;
        $post->category = $request->category;
        $post->save();

        return redirect()->route('posts.index')->with('message', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();
    }
}
