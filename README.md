# Laravel + React (Inertia) Starter — Project Documentation

## Summary
A Laravel backend with a React (TypeScript) frontend using Inertia.js and Vite. Includes user authentication (Laravel Fortify), posts CRUD (with image upload and slugging), TailwindCSS, and shadcn/ui + radix components.

## Tech stack
- PHP (Laravel)
- TypeScript / React (Inertia)
- Vite
- Tailwind CSS
- Laravel Fortify (auth)
- SQLite (default dev DB present: `database/database.sqlite`)
- Composer & NPM

## Key features
- Server-side routes with Inertia-powered React pages
- Posts CRUD with image upload (stored on `public` disk) and unique slug handling
- Pagination and search support on posts listing
- Authentication via Fortify

## Important files & folders
- `app/Http/Controllers/PostController.php` — Posts CRUD, image handling, slug generation, validation
- `app/Models/` — Eloquent models (including `Post`)
- `resources/js/pages/posts/` — Frontend pages:
    - `index.tsx` — posts list (search + pagination)
    - `create.tsx` — create post form
    - `edit.tsx` — edit post form
- `routes/web.php` — web routes (resource routes for posts expected)
- `database/` — migrations, seeders, and `database.sqlite`
- `vite.config.ts`, `package.json`, `tsconfig.json` — frontend build config
- `phpunit.xml`, `tests/` — test configuration and test suites

## Implementation notes (brief)
- Validation rules are defined in controller (`title`, `content`, `status`, `category`, `image`).
- Images are stored via `$file->storeAs('posts', $uniqueFileName, 'public')` and deleted on post deletion.
- Slugs are created from title using `Str::slug()` and made unique by appending a unique id when needed.
- Posts listing uses `Auth::user()->posts()->latest()` and is paginated with 5 items per page. Search is supported via a `search` query param.

## Setup / Local development
1. Clone repository and enter it:
    - `git clone <repo-url>`
    - `cd Crud-Laravel-InetiaJs`
2. Install backend deps:
    - `composer install`
3. Install frontend deps:
    - `npm install` or `pnpm install`
4. Environment:
    - Copy env: `cp .env.example .env`
    - Generate app key: `php artisan key:generate`
    - If using SQLite (default dev DB present), ensure `DB_CONNECTION=sqlite` and `database/database.sqlite` exists (file included).
    - Configure other env vars as needed (mail, storage, etc.).
5. Storage & DB:
    - `php artisan migrate --seed` (or `php artisan migrate:fresh --seed`)
    - `php artisan storage:link`
6. Run dev servers:
    - Frontend (Vite): `npm run dev`
    - Backend: `php artisan serve`
7. Access app in browser (usually `http://127.0.0.1:8000/posts`).

## Notes on usage
- Authentication views and flows are provided by Fortify — register/login to manage posts.
- Posts routes (resourceful) are exposed from `routes/web.php` and handled by `PostController`.
- When uploading an image, it is stored on the `public` disk; deleting a post removes its image from storage.
- The posts index supports `?search=term` to filter results.

## Contribution
- Follow typical GitHub flow: create a branch, make changes, open a PR.
- Run tests & linting before submitting changes.
