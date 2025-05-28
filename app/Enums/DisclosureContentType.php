<?php

namespace App\Enums;

use Illuminate\Support\Collection;

enum DisclosureContentType: string
{
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

    /**
     * Get the human-readable label for the enum value
     */
    public function label(): string
    {
        return match($this) {
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

    /**
     * Convert from legacy boolean fields to enum set
     */
    public static function fromLegacyBooleanFields(array $fields): array
    {
        $types = [];

        if ($fields['disclose_entire_file'] ?? false) {
            $types[] = self::ENTIRE_FILE;
        }
        
        if ($fields['disclose_licensure_information'] ?? false) {
            $types[] = self::LICENSURE_INFORMATION;
        }
        
        if ($fields['disclose_medical_psychiatric_records'] ?? false) {
            $types[] = self::MEDICAL_PSYCHIATRIC_RECORDS;
        }
        
        if ($fields['disclose_hotline_investigations'] ?? false) {
            $types[] = self::HOTLINE_INVESTIGATIONS;
        }
        
        if ($fields['disclose_home_studies'] ?? false) {
            $types[] = self::HOME_STUDIES;
        }
        
        if ($fields['disclose_eligibility_determinations'] ?? false) {
            $types[] = self::ELIGIBILITY_DETERMINATIONS;
        }
        
        if ($fields['disclose_substance_abuse_treatment'] ?? false) {
            $types[] = self::SUBSTANCE_ABUSE_TREATMENT;
        }
        
        if ($fields['disclose_client_employment_records'] ?? false) {
            $types[] = self::CLIENT_EMPLOYMENT_RECORDS;
        }
        
        if ($fields['disclose_benefits_received'] ?? false) {
            $types[] = self::BENEFITS_RECEIVED;
        }
        
        if ($fields['disclose_other_information'] ?? false) {
            $types[] = self::OTHER;
        }

        return $types;
    }

    /**
     * Get all values as a collection
     */
    public static function collection(): Collection
    {
        return collect(self::cases());
    }
} 