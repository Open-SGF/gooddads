export interface IntakeDisclosureAuthorizationForm {
  id: string;
  
  // Consumer details
  consumer_name: string;
  
  // Authorized entities
  is_dss_authorized: boolean;
  is_dys_authorized: boolean;
  is_mhd_authorized: boolean;
  is_dfas_authorized: boolean;
  is_mmac_authorized: boolean;
  is_fsd_authorized: boolean;  
  is_cd_authorized: boolean;  
  is_dls_authorized: boolean;
  is_other_authorized: boolean;
  other_authorized_entity: string;
  
  // Subject information
  subject_name: string;
  subject_phone: string;
  subject_dob: string; // ISO format date string
  subject_ssn: string;
  subject_address: string;
  subject_email: string;
  
  // Recipients
  disclose_to_attorney: boolean;
  attorney_name: string;
  disclose_to_employer: boolean;
  employer_name: string;
  disclose_to_legislator: boolean;
  legislator_name: string;
  disclose_to_governors_staff: boolean;
  governors_staff_details: string;
  disclose_to_other_recipient: boolean;
  other_recipient_name: string;
  other_recipient_address: string;
  
  // Purpose of disclosure
  purpose_eligibility_determination: boolean;
  purpose_legal_consultation: boolean;
  purpose_legal_proceedings: boolean;
  purpose_employment: boolean;
  purpose_complaint_investigation: boolean;
  purpose_treatment_planning: boolean;
  purpose_continuity_of_services: boolean;
  purpose_background_investigation: boolean;
  purpose_consumer_request: boolean;
  purpose_share_and_refer: boolean;
  share_and_refer_details: string,
  purpose_other: boolean;
  other_purpose_details: string;
  
  // Information to be disclosed
  disclose_entire_file: boolean;
  disclose_licensure_information: boolean;
  disclose_medical_psychiatric_records: boolean;
  disclose_hotline_investigations: boolean;
  disclose_home_studies: boolean;
  disclose_eligibility_determinations: boolean;  
  disclose_substance_abuse_treatment: boolean;  
  disclose_client_employment_records: boolean;
  disclose_benefits_received: boolean;
  disclose_other_information: boolean;
  other_disclosure_details: string;

  // Communication preferences
  accept_text_messages: boolean
  // Signatures
  consumer_signature: string;
  signature_date: string;
  witness_signature: string;
  witness_signature_date: string;
  guardian_signature: string;
  guardian_authority: string;

  // Survey delivery methods
  survey_by_email: boolean;
  survey_by_mail: boolean;
  survey_by_online: boolean;
};