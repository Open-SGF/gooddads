<?php

namespace App\Data\Props;

use Glhd\Gretel\View\Breadcrumb;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class MiddlewareProps extends Data
{
    public function __construct(
        public AuthProp $auth,
        public RequestProp $request,
        public ?ToastProp $toast,
        public ?Breadcrumb $breadcrumb,
    ) {
    }
}
