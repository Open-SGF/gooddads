<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class NeonDataTransformer
{
    public function transformPerson(array $data): object {

        $transformedContactInfo = $this->transformContactInfo($data['contactInfo']['records'][0], $data['children']['records']);
        $transformedDisclosure = $this->transformDisclosure($data['disclosure']['records'][0]);
        $transformedFatherhoodAssessmentWorksheet = $this->transformFatherhoodAssessmentWorksheet($data['assessment']['records'][0]);
        $transformedFatherhoodSurvey =$this->transformFatherhoodSurvey($data['survey']['records'][0]);
        $transformedServicePlan = $this->transformServicePlan($data['servicePlan']['records'][0]);

        $transformedPerson = array_merge(
            $transformedContactInfo, 
            $transformedDisclosure, 
            $transformedFatherhoodAssessmentWorksheet, 
            $transformedFatherhoodSurvey, 
            $transformedServicePlan
        );

        return (object) $transformedPerson;
    }

    private function transformContactInfo(array $contactInfo, array $children) : array {

        $transformedContactInfo = [];

        $transformedContactInfo['title_region'] = $contactInfo['regions_id']['displayValue'];
        $transformedContactInfo['full_name'] = $contactInfo['persons_id']['displayValue'];
        $transformedContactInfo['submission_date_af_date'] = Carbon::createFromFormat('Y-m-d', $contactInfo['enteredDate']['value']);
        $transformedContactInfo['address'] = implode(' ', [
            $contactInfo['address1']['value'], 
            $contactInfo['address2']['value'] ?? '', 
            $contactInfo['city']['value'], 
            $contactInfo['state']['displayValue'],
            $contactInfo['zip']['value'],
        ]);
        $transformedContactInfo['employer'] = $contactInfo['employer']['value'];
        $transformedContactInfo['t_shirt_size'] = $contactInfo['tShirtSize']['displayValue'];
        $transformedContactInfo['phone'] = $contactInfo['homeCellPhone']['value'];
        $transformedContactInfo['work_phone'] = $contactInfo['workPhone']['value'];
        $transformedContactInfo['other_phone'] = $contactInfo['workPhone']['value'] ?? '';
        $transformedContactInfo['email'] = $contactInfo['email']['value'];
        $transformedContactInfo['case_worker_name'] = $contactInfo['probationParoleCaseWorkerName']['value'];
        $transformedContactInfo['case_worker_phone'] = $contactInfo['probationParoleCaseWorkerPhone']['value'];

        foreach ($children as $index => $child) {
            $childCount = $index + 1;
            $childDob = Carbon::createFromFormat('Y-m-d', $child['dateOfBirth']['value']);
            $childAge = (int)$childDob->diffInYears(Carbon::now());
            $transformedContactInfo['child_name_' . $childCount] = implode(' ' , [$child['firstName']['value'], $child['lastName']['value']]);
            $transformedContactInfo['child_age_' . $childCount] = $childAge;
            $transformedContactInfo['child_dob_' . $childCount] = $childDob;
            

        }

        $transformedContactInfo['contact_with_children'] = match($contactInfo['contactWithChildren']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        $childContactType = explode(",", $contactInfo['contactType']['value']);

        $transformedContactInfo['children_custody'] = match(true) {
            in_array('763', $childContactType) => 'Yes',
            default => 'Off'
        };

        $transformedContactInfo['children_visitation'] = match(true) {
            in_array('762', $childContactType) => 'Yes',
            default => 'Off'
        };

        $transformedContactInfo['children_phone'] = match(true) {
            in_array('1483', $childContactType) => 'Yes',
            default => 'Off'
        };

        $transformedContactInfo['monthly_child_support'] = $contactInfo['monthlyChildSupportPayment']['displayValue'];
        $transformedContactInfo['marital_status'] = $contactInfo['maritalStatus']['displayValue'];
        $transformedContactInfo['ethnicity'] = $contactInfo['ethnicity']['displayValue'];

        return $transformedContactInfo;
    }

    private function transformDisclosure(array $disclosure) : array {
        $transformedDisclosure = [];
        $transformedDisclosure['authorize_full_name'] = $disclosure['persons_id']['displayValue'];

        $transformedDivision = $this->transformDivision($disclosure);
        $transformedReleaseTo = $this->transformReleaseTo($disclosure);
        $transformedPurpose = $this->transformPurpose($disclosure);
        $transformedToBeDisclosed = $this->transformToBeDisclosed($disclosure);
                
        $transformedDisclosure = array_merge(
            $transformedDisclosure, 
            $transformedDivision, 
            $transformedReleaseTo, 
            $transformedPurpose, 
            $transformedToBeDisclosed
        );

        $transformedDisclosure['accept_text_messages'] = match($disclosure['acceptsTextMessage']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        return $transformedDisclosure;
    }

    private function transformDivision(array $disclosure) : array {
        $transformedDivision = [];

        $divisions = explode(",", $disclosure['division']['value']);

        $transformedDivision['authorize_dys'] = match(true) {
            in_array('679', $divisions) => 'Yes',
            default => 'Off'
        };

        $transformedDivision['authorize_mhd'] = match(true) {
            in_array('684', $divisions) => 'Yes',
            default => 'Off'
        };

        $transformedDivision['authorize_dfas'] = match(true) {
            in_array('683', $divisions) => 'Yes',
            default => 'Off'
        };

        $transformedDivision['authorize_mmac'] = match(true) {
            in_array('1484', $divisions) => 'Yes',
            default => 'Off'
        };

        if (isset($division['divisionOther']['value']) && $divisions['divisionOther']['value']) {
            $transformedDivision['authorize_other'] = 'Yes';
            $transformedDivision['authorize_discloser_form_other'] = $divisions['divisionOther'];
        } else {
            $transformedDivision['authorize_other'] = 'Off';
            $transformedDivision['authorize_discloser_form_other'] = null;
        }

        $transformedDivision['authorize_cd'] = match(true) {
            in_array('682', $divisions) => 'Yes',
            default => 'Off'
        };

        $transformedDivision['authorize_dls'] = match(true) {
            in_array('681', $divisions) => 'Yes',
            default => 'Off'
        };

        return $transformedDivision;
    }

    private function transformReleaseTo(array $disclosure) : array {
        $transformedReleaseTo = [];

        $transformedReleaseTo['disclose_full_name'] = $disclosure['persons_id']['displayValue'];
        $transformedReleaseTo['disclose_phone'] = $disclosure['homeCellPhone']['value'];

        if (isset($disclosure['dateOfBirth']['value']) && $disclosure['dateOfBirth']['value']) {
            $transformedReleaseTo['disclose_dob'] =  Carbon::createFromFormat('Y-m-d', $disclosure['dateOfBirth']['value']);
        } else {
            $transformedReleaseTo['disclose_dob'] = null;
        }

        $transformedReleaseTo['disclose_ssn'] = null;
        $transformedReleaseTo['disclose_address'] = $disclosure['fullAddress']['displayValue'];
        $transformedReleaseTo['disclose_email'] = $disclosure['email']['value'];

        $releaseTo = explode(",", $disclosure['releaseTo']['value']);

        /**
         * Here there are mismatches between the database fields to whom the information should be disclosed to and the paper form, 
         * and the pdf fields to whom the information should be disclosed to and the paper form
         * 
         * The paper form has two fields for each possible recipient of information - a checkbox and a text field.
         * The pdf only has the text fields
         * The database only has the checkbox fields
         * 
         * For demo purposes the text fields in the pdf will be populated with whether or not ('Yes' or 'No') the checkbox field is present in the db
         * 
         */

        $transformedReleaseTo['disclose_to_attorney'] = match(true) {
            in_array('719', $releaseTo) => 'Yes',
            default => 'Off'
        };

        $transformedReleaseTo['disclose_to_legislator'] = match(true) {
            in_array('1487', $releaseTo) => 'Yes',
            default => 'Off'
        };

        $transformedReleaseTo['disclose_to_employer'] = match(true) {
            in_array('1486', $releaseTo) => 'Yes',
            default => 'Off'
        };

        $transformedReleaseTo['disclose_to_governors_staff'] = match(true) {
            in_array('1488', $releaseTo) => 'Yes',
            default => 'Off'
        };

        $transformedReleaseTo['other_discloser'] = $disclosure['releaseToOther']['displayValue'];

        return $transformedReleaseTo;
    }

    private function transformPurpose(array $disclosure) : array {        
        $transformedPurpose = [];

        $purposes = explode(",", $disclosure['purposeOfDisclosure']['value']);

        $transformedPurpose['disclosure_purpose_eligibility_determination'] = match(true) {
            in_array('585', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_employment'] = match(true) {
            in_array('594', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_continuity_of_services_care'] = match(true) {
            in_array('447', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_legal_consultation_representation'] = match(true) {
            in_array('1490', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_compliant_investigation_resolution'] = match(true) {
            in_array('1491', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_background_investigation'] = match(true) {
            in_array('1492', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_legal_proceedings'] = match(true) {
            in_array('1493', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_treatment_planning'] = match(true) {
            in_array('1494', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_at_consumers_request'] = match(true) {
            in_array('1495', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_to_share_or_refer'] = match(true) {
            in_array('755', $purposes) => 'Yes',
            default => 'Off'
        };

        $transformedPurpose['disclosure_purpose_other'] = match(true) {
            in_array("1496", $purposes) => 'Yes',
            default => 'Off'
        };

        return $transformedPurpose;
    }

    private function transformToBeDisclosed(array $disclosure) : array {
        $transformedToBeDisclosed = [];

        $toBeDisclosed = explode(",", $disclosure['informationToBeDisclosed']['value']);

        $transformedToBeDisclosed['disclosure_licensure_information'] = match(true) {
            in_array('161', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        /**
         * PDF field for Medical/Psychiatric/Treatment is missing. This may have to be updated
         */
        $transformedToBeDisclosed['disclosure_medical_psychiatric_treatment_records'] = match(true) {
            in_array('1497', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        $transformedToBeDisclosed['disclose_hotline_investigations'] = match(true) {
            in_array('1499', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        $transformedToBeDisclosed['disclosure_home_studies'] = match(true) {
            in_array('1500', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        $transformedToBeDisclosed['disclosure_eligibility_determinations'] = match(true) {
            in_array('1501', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        $transformedToBeDisclosed['disclosure_substance_abuse_treatment'] = match(true) {
            in_array('1502', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        $transformedToBeDisclosed['disclosure_client_employment_records'] = match(true) {
            in_array('1503', $toBeDisclosed) => 'Yes',
            default => 'Off'
        };

        return $transformedToBeDisclosed;
    }

    private function transformFatherhoodAssessmentWorksheet(array $assessment) : array {
        $transformedAssessment = [];

        /**
         * Not sure if this is the correct PDF field
         */

        $transformedAssessment['participant_full_name'] = $assessment['persons_id']['displayValue'];

        if (isset($assessment['dateOfBirth']['value']) && $assessment['dateOfBirth']['value']) {
            $transformedAssessment['participant_dob'] =  Carbon::createFromFormat('Y-m-d', $assessment['dateOfBirth']['value']);
        } else {
            $transformedAssessment['participant_dob'] = null;
        }
        
        $transformedAssessment['eligibility_missouri_resident'] = match($assessment['missouriResident']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        $transformedAssessment['eligibility_child_under_18'] = match($assessment['childUnder18']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        /**
         * PDF field for financial eligibility according to standards appears to be missing
         */

        $transformedAssessment['financial_assessment_drivers_licence'] = match($assessment['dL']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        $transformedAssessment['financial_assessment_utility_bill'] = match($assessment['utilityBill']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        
        /**
         * PDF field for financial assessment pay stub appears to be missing
         */

        $transformedAssessment['financial_assessment_written_employer_statement'] = match($assessment['writtenEmployerStatement']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };


        $transformedAssessment['financial_assessment_ss_benefits_statement'] = match($assessment['socialSecurityBenefitsStatement']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };
 
        $transformedAssessment['financial_assessment_no_employment_income'] = match($assessment['selfAttestationOfNoEmploymentOrIncome']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        $transformedAssessment['financial_assessment_unemployment_compensation'] = match($assessment['unemploymentCompensation']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        $transformedAssessment['financial_assessment_other'] = match($assessment['other']['displayValue']) {
            '1' => 'Yes',
            '0' => 'No',
            default => 'Off'
        };

        if (isset($assessment['other']['displayValue']) && $assessment['other']['displayValue']) {
            $transformedAssessment['financial_assessment_other'] = 'Yes';
            $transformedAssessment['financial_assessment_other_description'] = $assessment['other']['displayValue'];
        } else {
            $transformedAssessment['financial_assessment_other'] = 'Off';
            $transformedAssessment['financial_assessment_other_description'] = null;
        }

        $transformedAssessment['poverty_level_monthly_income'] = $assessment['hoseholdIncome']['displayValue'];
        $transformedAssessment['poverty_level_number_of_household_members'] = $assessment['numberOfFamilyMembersInHousehold']['value'];
        $transformedAssessment['peverty_level_percentage_fpl'] = $assessment['percentageOfFPL']['value'];

        return $transformedAssessment;
    }

    private function transformFatherhoodSurvey(array $survey) : array {
        $transformedFatherhoodSurvey = [];

        if (isset($survey['dateOfBirth']['value']) && $survey['dateOfBirth']['value']) {
            $transformedFatherhoodSurvey['survey_client_dob'] = Carbon::createFromFormat('Y-m-d', $survey['dateOfBirth']['value']);
        } else {
            $transformedFatherhoodSurvey['survey_client_dob'] = null;
        }        

        /**
         * Survey why are you here is single option in PDF, but appears to be multiple choice on paper form
         */
        $reasons = explode(",", $survey['reasons']['value']);
        $transformedFatherhoodSurvey['survey_why'] = match(true) {
            in_array('453', $reasons) => 'Responsible Father',
            in_array('454', $reasons) => 'Referred',
            in_array('1506', $reasons) => 'Child support concerns',
            in_array('695', $reasons) => 'Attournay',
            in_array('1507', $reasons) => 'Other',
            default => 'Off'
        };

        if (isset($survey['reasonsOther']['value']) && $survey['reasonsOther']['value']) {
            $transformedFatherhoodSurvey['survey_other_description'] = $survey['reasonsOther']['value'];
        } else {
            $transformedFatherhoodSurvey['survey_other_description'] = null;
        }

        /**
         * Survey how you heard about us is single option in PDF, but appears to be multiple choice on paper form
         */
        $howHeardAbout = explode(",", $survey['hearAboutUs']['value']);
        $transformedFatherhoodSurvey['survey_how'] = match(true) {
            in_array('1510', $howHeardAbout) => 'Family support',
            in_array('1509', $howHeardAbout) => 'Past participant',
            in_array('1512', $howHeardAbout) => 'Marketing',
            in_array('1511', $howHeardAbout) => 'Prosecuting attorney',
            in_array('1513', $howHeardAbout) => 'The organization',
            in_array('1508', $howHeardAbout) => 'Word of mouth',
            in_array('1514', $howHeardAbout) => 'Other',
        };

        if (isset($survey['hearAboutUsOther']['value']) && $survey['hearAboutUsOther']['value']) {
            $transformedFatherhoodSurvey['survey_how_other_description'] = $survey['hearAboutUsOther']['value'];
        } else {
            $transformedFatherhoodSurvey['survey_how_other_description'] = null;
        }

        /**
         * Survey expect to gain is single option in PDF, but appers to be multiple choice on paper form
         * Database table appears to be missing option for health and wellness
         */
        $expectedGain = explode(",", $survey['expectToGain']['value']);
        $transformedFatherhoodSurvey['survey_gain'] = match(true) {
            in_array('1520', $expectedGain) => 'Access to mentors',
            in_array('1524', $expectedGain) => 'Credit repair assistance',
            in_array('1521', $expectedGain) => 'Criminal History Assistance',
            in_array('1522', $expectedGain) => 'Overcoming homelessness assistance',
            in_array('1516', $expectedGain) => 'Abuse assistance',
            in_array('1523', $expectedGain) => 'Visitation custody assistance',
            in_array('1515', $expectedGain) => 'Emplyment opportunities',
            in_array('1517', $expectedGain) => 'Parenting skills',
            in_array('1526', $expectedGain) => 'Increased Understanding of Child Support',
            in_array('1525', $expectedGain) => 'Maintaining Hope',
            in_array('1525', $expectedGain) => 'Resume building',
            in_array('1519', $expectedGain) => 'Legal services',
            in_array('1527', $expectedGain) => 'Other',
        };

        if (isset($survey['expectToGainOther']['value']) && $survey['expectToGainOther']['value']) {
            $transformedFatherhoodSurvey['survey_gain_other_description'] = $survey['expectToGainOther']['value'];
        } else {
            $transformedFatherhoodSurvey['survey_gain_other_description'] = $survey['expectToGainOther']['value'];
        }

        return $transformedFatherhoodSurvey;
    }

    private function transformServicePlan(array $servicePlan) : array {
        $transformedServicePlan = [];

        $transformedServicePlan['service_plan_participant_full_name'] = $servicePlan['persons_id']['displayValue'];
        $transformedServicePlan['service_plan_client_number'] = $servicePlan['clientNumber']['value'];

        /**
         * PDF form appears to be missing field for review dates and service areas
         */

        $transformedServicePlan['service_plan_service_identified'] = $servicePlan['serviceIdentifiedByTheParticipants']['value'];

        /**
         * Database appears to be missing field for service plan goal
         */

        /**
         * PDF form appears to not have fields for service plan objectives, and there are only three PDF fields for service plan strategies/responsible persons/timelines/measures
         * Assuming that the missing PDF fields are hard coded in the PDF.
         */

        $transformedServicePlan['service_plan_strategies_1'] = $servicePlan['goals_custodyVisitationObj']['displayValue'];
        $transformedServicePlan['service_plan_person_responsible_1'] = $servicePlan['goals_custodyVisitationPersonRes']['displayValue'];
        $transformedServicePlan['service_plan_timeline_1'] = $servicePlan['goals_custodyVisitationTimeline']['displayValue'];
        $transformedServicePlan['service_plan_measure_of_success_1'] = $servicePlan['goals_custodyVisitationMeasure']['value'];

        $transformedServicePlan['service_plan_strategies_2'] = $servicePlan['goals_educationEmploymentObj']['displayValue'];
        $transformedServicePlan['service_plan_person_responsible_2'] = $servicePlan['goals_educationEmploymentPersonRes']['displayValue'];
        $transformedServicePlan['service_plan_timeline_2'] = $servicePlan['goals_educationEmploymentTimeline']['displayValue'];
        $transformedServicePlan['service_plan_measure_of_success_2'] = $servicePlan['goals_educationEmploymentMeasure']['value'];

        $transformedServicePlan['service_plan_strategies_3'] = $servicePlan['goals_housingTransportationObj']['displayValue'];
        $transformedServicePlan['service_plan_person_responsible_3'] = $servicePlan['goals_housingTransportationPersonRes']['displayValue'];
        $transformedServicePlan['service_plan_timeline_3'] = $servicePlan['goals_housingTransportationTimeline']['displayValue'];
        $transformedServicePlan['service_plan_measure_of_success_3'] = $servicePlan['goals_housingTransportationMeasure']['value'];
        return $transformedServicePlan;
    }
}
