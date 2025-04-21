import React from 'react';
import { router, useForm } from '@inertiajs/react'

import type { IntakeServicePlanForm } from '@/types/intake-serviceplan-form'
import type { Participant } from '@/types/participant'

import { 
  Button, 
  Input, 
  Checkbox, 
  Label, 
} from "@/Components/ui";


interface ServicePlanFromProps {
  participant: Participant
  serviceplanForm?: IntakeServicePlanForm  
  viewOnly?: boolean
  nextRoute?: string
}

// Define types for form data
interface ServicePlanFormDefinition extends Record<string, string | number | boolean | null> {
  participant_name: string,
  client_number: string,
  review_date: string,
  parenting_skill_development_is_service_area: boolean,
  effective_co_parenting_is_service_area: boolean,
  employment_and_education_is_service_area: boolean,
  child_support_is_service_area: boolean,
  domestic_violence_is_service_area: boolean,
  service_identified_by_participant: string,
  goal: string,
  custody_visitation_strategy: string,
  custody_visitation_person_responsible: string,
  custody_visitation_timeline: string,
  custody_visitation_measure_of_success: string,
  education_employment_strategy: string,
  education_employment_person_responsible: string,
  education_employment_timeline: string,
  education_employment_measure_of_success: string,
  housing_transportation_strategy: string,
  housing_transportation_person_responsible: string,
  housing_transportation_timeline: string,
  housing_transportation_measure_of_success: string,
  participant_signature: string,
  participant_signature_date: string,
  case_manager_signature: string,
  case_manager_signature_date: string,
  date_completed: string,

}

export const ServicePlanForm: React.FC<ServicePlanFromProps> = ({ 
  participant,
  serviceplanForm,  
  viewOnly = false,
  nextRoute  = 'intake.media-release.index'
}) => {
  const { data, setData, processing, errors, ...form } = useForm<ServicePlanFormDefinition>({
    participant_name: serviceplanForm?.participant_name ?? participant?.name ?? '',
    client_number: serviceplanForm?.client_number ?? '',
    review_date: serviceplanForm?.review_date ?? '',

    parenting_skill_development_is_service_area: serviceplanForm?.parenting_skill_development_is_service_area ?? true,
    effective_co_parenting_is_service_area: serviceplanForm?.effective_co_parenting_is_service_area ?? true,
    employment_and_education_is_service_area: serviceplanForm?.employment_and_education_is_service_area ?? true,
    child_support_is_service_area: serviceplanForm?.employment_and_education_is_service_area ?? true,
    domestic_violence_is_service_area: serviceplanForm?.domestic_violence_is_service_area ?? false,
    
    service_identified_by_participant: serviceplanForm?.service_identified_by_participant ?? '',
    goal: serviceplanForm?.goal ?? '',
    
    custody_visitation_strategy: serviceplanForm?.custody_visitation_strategy ?? '',
    custody_visitation_person_responsible: serviceplanForm?.custody_visitation_person_responsible ?? '',
    custody_visitation_timeline: serviceplanForm?.custody_visitation_timeline ?? '',
    custody_visitation_measure_of_success: serviceplanForm?.custody_visitation_measure_of_success ?? '',
    education_employment_strategy: serviceplanForm?.education_employment_strategy ?? '',
    education_employment_person_responsible: serviceplanForm?.education_employment_person_responsible ?? '',
    education_employment_timeline: serviceplanForm?.education_employment_timeline ?? '',
    education_employment_measure_of_success: serviceplanForm?.education_employment_measure_of_success ?? '',
    housing_transportation_strategy: serviceplanForm?.housing_transportation_strategy ?? '',
    housing_transportation_person_responsible: serviceplanForm?.housing_transportation_person_responsible ?? '',
    housing_transportation_timeline: serviceplanForm?.housing_transportation_timeline ?? '',
    housing_transportation_measure_of_success: serviceplanForm?.housing_transportation_measure_of_success ?? '',
    participant_signature: serviceplanForm?.participant_signature ?? '',
    participant_signature_date: serviceplanForm?.participant_signature_date ?? '',
    case_manager_signature: serviceplanForm?.case_manager_signature ?? '',
    case_manager_signature_date: serviceplanForm?.case_manager_signature_date ?? '',
    date_completed: serviceplanForm?.date_completed ?? '',
  });

  const continueToNextStep = () => {
    console.log("ServicePlanForm.continueToNextStep - nextRoute: " + nextRoute)
    router.visit(route(nextRoute))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
    <form
        onSubmit={(e) => {
            e.preventDefault()
            console.log("ServicePlanForm.onSubmit")
            if (viewOnly) {
                continueToNextStep()
                return
            }

            if (serviceplanForm?.id) {
                form.put(
                    route('intake.service-plan.update', [
                        serviceplanForm.id,
                    ]),
                    {
                        onSuccess: () => {
                            continueToNextStep()
                        },
                    },
                )
            } else {
                form.post(route('intake.service-plan.store'), {
                    onSuccess: () => {
                        continueToNextStep()
                    },                    
                })
            }
        }}
        className="bg-white rounded-lg shadow-md p-6"
    >
        <h1 className="text-2xl font-bold text-center mb-6">
            Individualized Service Plan
        </h1>
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participant_name">
                      Participant Name
                    </Label>
                    <Input
                      id="participant_name"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.participant_name}
                      onChange={(e) => setData('participant_name', e.target.value)}
                      disabled={viewOnly || processing}
                    />
                    {errors.participant_name && <div className="text-red-500 text-xs">{errors.participant_name}</div>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client_number">
                        Client Number<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="client_number"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.client_number}
                        onChange={(e) => setData('client_number', e.target.value)}
                        disabled={viewOnly || processing}
                      />
                      {errors.client_number && <div className="text-red-500 text-xs">{errors.client_number}</div>}
                    </div>

                    <div>
                      <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review_dates">
                        Review Dates
                      </Label>
                      <Input
                        id="review_dates"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={data.review_date}
                        onChange={(e) => setData('review_date', e.target.value)}
                        disabled={viewOnly || processing}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Areas Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Service Areas:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="parenting_skill_development"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={data.parenting_skill_development_is_service_area}
                        onCheckedChange={(checked) => setData('parenting_skill_development_is_service_area', !!checked)}
                        disabled={viewOnly || processing}
                      />
                      <Label className="ml-2 block text-gray-700" htmlFor="parenting_skill_development">
                        Parenting skill development
                      </Label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="effective_co_parenting"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={data.effective_co_parenting_is_service_area}
                        onCheckedChange={(checked) => setData('effective_co_parenting_is_service_area', !!checked)}
                        disabled={viewOnly || processing}
                      />
                      <Label className="ml-2 block text-gray-700" htmlFor="effective_co_parenting">
                        Effective co-parenting with the child's guardian
                      </Label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="employment_and_education"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={data.employment_and_education_is_service_area}
                        onCheckedChange={(checked) => setData('employment_and_education_is_service_area', !!checked)}
                        disabled={viewOnly || processing}
                      />
                      <Label className="ml-2 block text-gray-700" htmlFor="employment_and_education">
                        Employment and education
                      </Label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="child_support"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={data.child_support_is_service_area}
                        onCheckedChange={(checked) => setData('child_support_is_service_area', !!checked)}
                        disabled={viewOnly || processing}
                      />
                      <Label className="ml-2 block text-gray-700" htmlFor="child_support">
                        Child Support
                      </Label>
                    </div>

                    <div className="flex items-center">
                      <Checkbox
                        id="domestic_violence"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={data.domestic_violence_is_service_area}
                        onCheckedChange={(checked) => setData('domestic_violence_is_service_area', !!checked)}
                        disabled={viewOnly || processing}
                      />
                      <Label className="ml-2 block text-gray-700" htmlFor="domestic_violence">
                        Domestic violence
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Service Identified & Goal Section */}
                <div className="mb-6">
                  <div className="mb-4">
                    <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service_identified">
                      Service identified by the participant:
                    </Label>
                    <Input
                      id="service_identified"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.service_identified_by_participant}
                      onChange={(e) => setData('service_identified_by_participant', e.target.value)}
                      disabled={viewOnly || processing}
                    />
                    {errors.service_identified_by_participant && <div className="text-red-500 text-xs">{errors.service_identified_by_participant}</div>}
                  </div>

                  <div>
                    <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                      Goal:<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="goal"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.goal}
                      onChange={(e) => setData('goal', e.target.value)}
                      disabled={viewOnly || processing}
                    />
                    {errors.goal && <div className="text-red-500 text-xs">{errors.goal}</div>}
                  </div>
                </div>

                {/* Objectives Tables */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Objectives</h2>

                  {/* Parenting Skills & Stress Management Table */}
                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="py-2 px-4 border">Objectives</th>
                          <th className="py-2 px-4 border">Strategies to Achieve Objective</th>
                          <th className="py-2 px-4 border">Person Responsible</th>
                          <th className="py-2 px-4 border">Timelines</th>
                          <th className="py-2 px-4 border">Measure of Success</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border">Parenting Skills Development</td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Completion of the Good Dads 2.0 Curriculum"
                              // onChange={(e) => updateObjective('parenting_skills', 'strategies', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Self"
                              // onChange={(e) => updateObjective('parenting_skills', 'person_responsible', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="3 Months"
                              // onChange={(e) => updateObjective('parenting_skills', 'timelines', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Pre-Post Assessment"
                              // onChange={(e) => updateObjective('parenting_skills', 'measure_of_success', e.target.value)}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Managing Stress and Anger</td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Completion of the Stress and Anger Management Module in Good Dads 2.0"
                              // onChange={(e) => updateObjective('stress_and_anger', 'strategies', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Self"
                              // onChange={(e) => updateObjective('stress_and_anger', 'person_responsible', e.target.value)}
                              disabled={true}
                              
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="3 Months"
                              // onChange={(e) => updateObjective('stress_and_anger', 'timelines', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Pre-Post Assessment"
                              // onChange={(e) => updateObjective('stress_and_anger', 'measure_of_success', e.target.value)}
                              disabled={true}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Custody/Education/Housing Table */}
                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="py-2 px-4 border">Objectives</th>
                          <th className="py-2 px-4 border">Strategies to Achieve Objective</th>
                          <th className="py-2 px-4 border">Person Responsible</th>
                          <th className="py-2 px-4 border">Timelines</th>
                          <th className="py-2 px-4 border">Measure of Success</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border">Custody/Visitation<span className="text-red-500">*</span></td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.custody_visitation_strategy}
                              onChange={(e) => setData('custody_visitation_strategy', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.custody_visitation_strategy && <div className="text-red-500 text-xs">{errors.custody_visitation_strategy}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.custody_visitation_person_responsible}
                              onChange={(e) => setData('custody_visitation_person_responsible', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.custody_visitation_person_responsible && <div className="text-red-500 text-xs">{errors.custody_visitation_person_responsible}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.custody_visitation_timeline}
                              onChange={(e) => setData('custody_visitation_timeline', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.custody_visitation_timeline && <div className="text-red-500 text-xs">{errors.custody_visitation_timeline}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.custody_visitation_measure_of_success}
                              onChange={(e) => setData('custody_visitation_measure_of_success', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.custody_visitation_measure_of_success && <div className="text-red-500 text-xs">{errors.custody_visitation_measure_of_success}</div>}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Education and or Employment<span className="text-red-500">*</span></td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.education_employment_strategy}
                              onChange={(e) => setData('education_employment_strategy', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.education_employment_strategy && <div className="text-red-500 text-xs">{errors.education_employment_strategy}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.education_employment_person_responsible}
                              onChange={(e) => setData('education_employment_person_responsible', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.education_employment_person_responsible && <div className="text-red-500 text-xs">{errors.education_employment_person_responsible}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.education_employment_timeline}
                              onChange={(e) => setData('education_employment_timeline', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.education_employment_timeline && <div className="text-red-500 text-xs">{errors.education_employment_timeline}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.education_employment_measure_of_success}
                              onChange={(e) => setData('education_employment_measure_of_success', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.education_employment_measure_of_success && <div className="text-red-500 text-xs">{errors.education_employment_measure_of_success}</div>}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Housing / Transportation<span className="text-red-500">*</span></td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.housing_transportation_strategy}
                              onChange={(e) => setData('housing_transportation_strategy', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.housing_transportation_strategy && <div className="text-red-500 text-xs">{errors.housing_transportation_strategy}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.housing_transportation_person_responsible}
                              onChange={(e) => setData('housing_transportation_person_responsible', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.housing_transportation_person_responsible && <div className="text-red-500 text-xs">{errors.housing_transportation_person_responsible}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.housing_transportation_timeline}
                              onChange={(e) => setData('housing_transportation_timeline', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.housing_transportation_timeline && <div className="text-red-500 text-xs">{errors.housing_transportation_timeline}</div>}
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.housing_transportation_measure_of_success}
                              onChange={(e) => setData('housing_transportation_measure_of_success', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.housing_transportation_measure_of_success && <div className="text-red-500 text-xs">{errors.housing_transportation_measure_of_success}</div>}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Child Support Section */}
                  <div className="mb-4">
                    <h3 className="text-md font-medium mb-2">Child Support Action Goal (Leave Blank)</h3>
                  </div>

                  {/* Child Support/Co-Parenting Table */}
                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="py-2 px-4 border">Objectives</th>
                          <th className="py-2 px-4 border">Strategies to Achieve Objective</th>
                          <th className="py-2 px-4 border">Person Responsible</th>
                          <th className="py-2 px-4 border">Timelines</th>
                          <th className="py-2 px-4 border">Measure of Success</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border">Child Support Awareness and Information</td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Child Support Education from FSD and Evaluation by Child Support staff from MO DSS/FSD"
                              // onChange={(e) => updateObjective('child_support_awareness', 'strategies', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="NPGD staff and MO FSD staff"
                              // onChange={(e) => updateObjective('child_support_awareness', 'person_responsible', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="1 Month"
                              // onChange={(e) => updateObjective('child_support_awareness', 'timelines', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Child Support Review from Missouri FSD Information about Payments and Modification"
                              // onChange={(e) => updateObjective('child_support_awareness', 'measure_of_success', e.target.value)}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Effective Co-Parenting</td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Relationship Education to Improve Personal Relationships and Interactions with Mother(s) of Children"
                              // onChange={(e) => updateObjective('co_parenting', 'strategies', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="NPGD staff"
                              // onChange={(e) => updateObjective('co_parenting', 'person_responsible', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="3-6 Months"
                              // onChange={(e) => updateObjective('co_parenting', 'timelines', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Completion of WMR/WOR Curriculum"
                              // onChange={(e) => updateObjective('co_parenting', 'measure_of_success', e.target.value)}
                              disabled={true}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border">Father to Father Mentoring</td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Find and develop a relationship with a good Dad"
                              // onChange={(e) => updateObjective('mentoring', 'strategies', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Self and NPGD staff"
                              // onChange={(e) => updateObjective('mentoring', 'person_responsible', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="1-2 Months"
                              // onChange={(e) => updateObjective('mentoring', 'timelines', e.target.value)}
                              disabled={true}
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value="Having a mentor"
                              // onChange={(e) => updateObjective('mentoring', 'measure_of_success', e.target.value)}
                              disabled={true}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Signature Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Participant Signature:<span className="text-red-500">*</span></label>
                      <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.participant_signature}
                              onChange={(e) => setData('participant_signature', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.participant_signature && <div className="text-red-500 text-xs">{errors.participant_signature}</div>}

                      <div className="flex justify-end">
                        <Label><span className="text-red-500">*</span>Date</Label>
                        <Input
                          id="participant_signature_date"
                          type="date"
                          placeholder="Date"
                          className="w-full"
                          autoComplete="off"
                          value={data.participant_signature_date}
                          onChange={(e) =>
                            setData('participant_signature_date', e.target.value)
                          }
                        />
                        {errors.participant_signature_date && <div className="text-red-500 text-xs">{errors.participant_signature_date}</div>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Case Manager Signature:<span className="text-red-500">*</span></label>
                      <Input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={data.case_manager_signature}
                              onChange={(e) => setData('case_manager_signature', e.target.value)}
                              disabled={viewOnly || processing}
                            />
                            {errors.case_manager_signature && <div className="text-red-500 text-xs">{errors.case_manager_signature}</div>}
                      <div className="flex justify-end">
                      <Label>Date<span className="text-red-500">*</span></Label>
                        <Input
                          id="case_manager_signature_date"
                          type="date"
                          placeholder="Date"
                          className="w-full"
                          autoComplete="off"
                          value={data.case_manager_signature_date}
                          onChange={(e) =>
                            setData('case_manager_signature_date', e.target.value)
                          }
                        />
                        {errors.case_manager_signature_date && <div className="text-red-500 text-xs">{errors.case_manager_signature_date}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end mt-8">
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={processing}
                    >
                     {viewOnly ? 'OK' : 'Save'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
    );
};

export default ServicePlanForm;