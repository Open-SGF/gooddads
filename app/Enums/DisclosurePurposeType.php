<?php

namespace App\Enums;

use Illuminate\Support\Collection;

enum DisclosurePurposeType: string
{
    case ELIGIBILITY_DETERMINATION = 'eligibility_determination';
    case LEGAL_CONSULTATION = 'legal_consultation';
    case LEGAL_PROCEEDINGS = 'legal_proceedings';
    case EMPLOYMENT = 'employment';
    case COMPLAINT_INVESTIGATION = 'complaint_investigation';
    case TREATMENT_PLANNING = 'treatment_planning';
    case CONTINUITY_OF_SERVICES = 'continuity_of_services';
    case BACKGROUND_INVESTIGATION = 'background_investigation';
    case CONSUMER_REQUEST = 'consumer_request';
    case SHARE_AND_REFER = 'share_and_refer';
    case OTHER = 'other';

    /**
     * Get the human-readable label for the enum value
     */
    public function label(): string
    {
        return match($this) {
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

    /**
     * Get all values as a collection
     */
    public static function collection(): Collection
    {
        return collect(self::cases());
    }
} 