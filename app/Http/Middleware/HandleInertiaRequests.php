<?php

namespace App\Http\Middleware;

use App\Data\Props\MiddlewareProps;
use App\Data\UserData;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Throwable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        try {
            $userProp = $request->user()
                ? UserData::from($request->user()->toArray())
                : null;

            $requestProp = [
                'location' => $request->url(),
                'query' => $request->query() ?? [],
            ];

            $middlewareProps = MiddlewareProps::from([
                'auth' => [
                    'user' => $userProp,
                ],
                'request' => $requestProp,
                'toast' => $request->session()->get('toast'),
            ])->toArray();

            return [
                ...parent::share($request),
                ...$middlewareProps,
            ];
        } catch (Throwable $e) {
            return [
                'error' => [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ],
            ];
        }
    }
}
