<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;
use Illuminate\Support\Collection;

enum DisclosurePurposeType: string
{
    use EnumDisplayArray;
    case ELIGIBILITY_DETERMINATION = 'eligibilityDetermination';
    case LEGAL_CONSULTATION = 'legalConsultation';
    case LEGAL_PROCEEDINGS = 'legalProceedings';
    case EMPLOYMENT = 'employment';
    case COMPLAINT_INVESTIGATION = 'complaintInvestigation';
    case TREATMENT_PLANNING = 'treatmentPlanning';
    case CONTINUITY_OF_SERVICES = 'continuityOfServices';
    case BACKGROUND_INVESTIGATION = 'backgroundInvestigation';
    case CONSUMER_REQUEST = 'consumerRequest';
    case SHARE_AND_REFER = 'shareAndRefer';
    case OTHER = 'other';

    public function displayValue(): string
    {
        return match ($this) {
            self::ELIGIBILITY_DETERMINATION => 'Eligibility Determination',
            self::LEGAL_CONSULTATION => 'Legal Consultation',
            self::LEGAL_PROCEEDINGS => 'Legal Proceedings',
            self::EMPLOYMENT => 'Employment',
            self::COMPLAINT_INVESTIGATION => 'Complaint/Investigation',
            self::TREATMENT_PLANNING => 'Treatment Planning',
            self::CONTINUITY_OF_SERVICES => 'Continuity of Services',
            self::BACKGROUND_INVESTIGATION => 'Background Investigation',
            self::CONSUMER_REQUEST => 'Consumer Request',
            self::SHARE_AND_REFER => 'Share and Refer Within the Organization',
            self::OTHER => 'Other',
        };
    }
}
