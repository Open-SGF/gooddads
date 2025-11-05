<?php

return [
    'dad_intake_form' => [
        // Core identity
        'Name' => 'full_name',
        'Date30_af_date' => 'submission_date',

        // Contact info
        'Phone Number' => 'phone',
        'Work Phone Number' => 'work_phone',
        'Other Number' => 'other_phone',
        'Email Address' => 'email',
        'Address' => 'address', // Address includes street, city, state, zip
        'Employer' => 'employer',
        'T-shirt Size' => 'tshirt_size',
        'Monthly Child Support' => 'monthly_child_support',

        // Case Worker
        'Worker' => 'case_worker_name',
        'Worker Phone Number' => 'case_worker_phone',

        // Children (Neon persons table didn’t include these yet)
        'Childs Name 1' => 'child_name_1',
        'Childs Name 2' => 'child_name_2',
        'Childs Name 3' => 'child_name_3',
        'Childs Name 4' => 'child_name_4',
        'Childs Name 5' => 'child_name_5',
        'Childs Age 1' => 'child_age_1',
        'Childs Age 2' => 'child_age_2',
        'Childs Age 3' => 'child_age_3',
        'Childs Age 4' => 'child_age_4',
        'Childs Age 5' => 'child_age_5',

        // Disclosure & legal
        'Discloser form other 1' => 'discloser_other_1',
        'Discloser form other 2' => 'discloser_other_2',
        'Attorney' => 'attorney',
        'Legislator' => 'legislator',
        'Employer 2' => 'employer_2',
        "Governor's Staff" => 'governors_staff',
        'Social Security Number' => 'ssn',

        // Survey (placeholders for now)
        'Survey other 1' => 'survey_other_1',
        'Survey other 2' => 'survey_other_2',
        'Survey other 3' => 'survey_other_3',

        // Intake / Case Plan
        'Client Number' => 'client_number',
        'Goal' => 'goal',
        'Strategies 1' => 'strategy_1',
        'Strategies 2' => 'strategy_2',
        'Strategies 3' => 'strategy_3',
        'Person Responsible 1' => 'responsible_1',
        'Person Responsible 2' => 'responsible_2',
        'Person Responsible 3' => 'responsible_3',
        'Timeline 1' => 'timeline_1',
        'Timeline 2' => 'timeline_2',
        'Timeline 3' => 'timeline_3',
        'Measure of Success 1' => 'success_1',
        'Measure of Success 2' => 'success_2',
        'Measure of Success 3' => 'success_3',
        'Service Identified' => 'service_identified',

        // Demographics
        'Birthday' => 'birthday',
        'Ethnicity' => 'ethnicity',
        'Marital Status' => 'marital_status',

        // Extra child slots in this section too
        'Child 1' => 'child_name_1',
        'Child 2' => 'child_name_2',
        'Child 3' => 'child_name_3',
        'Child 4' => 'child_name_4',
        'Child 5' => 'child_name_5',

        // Financial Assessment
        'monthly income' => 'monthly_income',
        '# of people' => 'household_size',
        'Percentage' => 'poverty_percentage',
        'Other 12' => 'other_financial_notes',
    ],
];
