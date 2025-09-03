<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum DisclosureContentType: string
{
    use EnumDisplayArray;
    case ENTIRE_FILE = 'entireFile';
    case LICENSURE_INFORMATION = 'licensureInformation';
    case MEDICAL_PSYCHIATRIC_RECORDS = 'medicalPsychiatricRecords';
    case HOTLINE_INVESTIGATIONS = 'hotlineInvestigations';
    case HOME_STUDIES = 'homeStudies';
    case ELIGIBILITY_DETERMINATIONS = 'eligibilityDeterminations';
    case SUBSTANCE_ABUSE_TREATMENT = 'substanceAbuseTreatment';
    case CLIENT_EMPLOYMENT_RECORDS = 'clientEmploymentRecords';
    case BENEFITS_RECEIVED = 'benefitsReceived';
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
