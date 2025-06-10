<?php

namespace App\Data\Props;

use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\RecordTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantDisclosureAuthorizationProps extends Data
{
    public function __construct(
        #[RecordTypeScriptType(DisclosurePurposeType::class, 'string')]
        public array $purposes,

        #[RecordTypeScriptType(DisclosureContentType::class, 'string')]
        public array $contentTypes
    ) {
    }
}
