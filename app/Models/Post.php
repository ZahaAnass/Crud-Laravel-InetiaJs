<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [

    ];

    protected $fillable = [
        "user_id",
        "title",
        "slug",
        "content",
        "status",
        "category",
        "image",
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
