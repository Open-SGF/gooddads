<?php

namespace App\Data\Forms;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantMediaReleaseForm extends Data
{
    public function __construct(
        #[Required, StringType, Max(191)]
        public ?string $printedName = null,

        #[Required, StringType, Max(191)]
        public ?string $signature = null,

        #[Nullable, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $signatureDate = null,

        #[Required, StringType, Max(191)]
        public ?string $phoneNumber = null,

        #[Required, Email, Max(191)]
        public ?string $email = null,
    ) {
    }

    public static function fromArray(array $data): self
    {
        // Convert snake_case keys to camelCase
        $camelCaseData = collect($data)->mapWithKeys(function ($value, $key) {
            return [Str::camel($key) => $value];
        })->all();

        return parent::from($camelCaseData);
    }

    public function rules(ValidationContext $context): array
    {
        return [
            'printedName' => ['required', 'string', 'max:191'],
            'signature' => ['required', 'string', 'max:191'],
            'signatureDate' => ['nullable', 'date'],
            'phoneNumber' => ['required', 'string', 'max:191'],
            'email' => ['required', 'string', 'email', 'max:191'],
        ];
    }
}
