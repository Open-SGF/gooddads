<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum DisclosureContentType: string
{
    use EnumDisplayArray;
    case ENTIRE_FILE = 'entire_file';
    case LICENSURE_INFORMATION = 'licensure_information';
    case MEDICAL_PSYCHIATRIC_RECORDS = 'medical_psychiatric_records';
    case HOTLINE_INVESTIGATIONS = 'hotline_investigations';
    case HOME_STUDIES = 'home_studies';
    case ELIGIBILITY_DETERMINATIONS = 'eligibility_determinations';
    case SUBSTANCE_ABUSE_TREATMENT = 'substance_abuse_treatment';
    case CLIENT_EMPLOYMENT_RECORDS = 'client_employment_records';
    case BENEFITS_RECEIVED = 'benefits_received';
    case OTHER = 'other';

    public function displayValue(): string
    {
        return match ($this) {
            self::ENTIRE_FILE => 'Entire File',
            self::LICENSURE_INFORMATION => 'Licensure Information',
            self::MEDICAL_PSYCHIATRIC_RECORDS => 'Medical/Psychiatric Records',
            self::HOTLINE_INVESTIGATIONS => 'Hotline Investigations',
            self::HOME_STUDIES => 'Home Studies',
            self::ELIGIBILITY_DETERMINATIONS => 'Eligibility Determinations',
            self::SUBSTANCE_ABUSE_TREATMENT => 'Substance Abuse Treatment',
            self::CLIENT_EMPLOYMENT_RECORDS => 'Client Employment Records',
            self::BENEFITS_RECEIVED => 'Benefits Received',
            self::OTHER => 'Other Information',
        };
    }
}
