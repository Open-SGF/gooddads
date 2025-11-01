<?php

namespace App\Services;

use mikehaertl\pdftk\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PdfIntakeFormService
{
    protected string $formKey = 'dad_intake_form';
    protected string $pdfTemplatePath = 'pdfs/intake-forms/Enrollment_Documents_Fillable_GD_North_Central_Contract_Region.pdf';

    public function generate($participant): string
    {
        $fieldMap = config("pdf_forms.{$this->formKey}");

        $data = [];
        foreach ($fieldMap as $pdfField => $participantField) {
            $value = data_get($participant, $participantField);
            // if ($value instanceof \Carbon\Carbon) {
            //     $value = $value->format('m/d/Y');
            // }
            $data[$pdfField] = $value ?? '';
        }

        // Build folder structure for each participant
        $storagePath = "participant-forms/{$participant->id}/";
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $filename = Str::of($participant->last_name)->slug('_')->ucfirst() . '_' . Str::of($participant->first_name)->slug('_')->ucfirst() . '_Enrollment_' . $timestamp . '.pdf';

        $outputPath = storage_path("app/{$storagePath}{$filename}");

        // Ensure directory exists
        Storage::makeDirectory($storagePath);

        // Load and fill the PDF
        $pdf = new Pdf(storage_path("app/{$this->pdfTemplatePath}"));
        $pdf->fillForm($data)
            ->needAppearances()
            ->flatten()
            ->saveAs($outputPath);

        if (!$pdf->getError()) {
            return "participant-forms/{$participant->id}/" . $filename;
        }

        throw new \Exception("PDF generation failed: " . $pdf->getError());
    }
}
