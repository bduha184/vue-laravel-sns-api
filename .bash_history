ls
cd backend
lse
exit
cd backend
php artisan make:model Article -a
npm install vue-router
exit
cd backend
php artisan migrate:flesh --seed
php artisan migrate:fresh --seed
php artisan migrate:fresh --seed
php artisan migrate:fresh --seed
php artisan migrate:fresh --seed
php artisan migrate:fresh
exit
cd backend
php artisan make:controller Auth/LoginController
composer require laravel/sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate:fresh
exit
