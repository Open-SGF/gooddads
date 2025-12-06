<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use mikehaertl\pdftk\Pdf;

class PdfFillFields extends Command
{
    protected $signature = 'pdf:fill-fields';

    protected $description = 'Fill all form fields with their field names for debugging layout';

    public function handle()
    {
        $inputPath = storage_path('app/pdfs/intake-forms/enrollment_documents_fillable_gd_global_DRAFT_v1.pdf');
        $timestamp = now()->format('Ymd_His');
        $outputPath = storage_path("app/pdfs/intake-forms/enrollment_documents_fillable_gd_global_DRAFT_v1-{$timestamp}.pdf");

        // --- 1️⃣ First instance: Get all field names ---
        $reader = new Pdf($inputPath);
        $fields = $reader->getDataFields();

        if (! $fields) {
            $this->error('No fields found.');

            return 1;
        }

        $this->info('Found '.count($fields).' fields.');

        // --- 2️⃣ Second instance: Fill the fields with their own names ---
        $pdf = new Pdf($inputPath);
        $formData = [];

        foreach ($fields as $field) {
            $formData[$field['FieldName']] = $field['FieldName'];
        }

        $result = $pdf
            ->fillForm($formData)
            ->needAppearances()
            ->saveAs($outputPath);

        if (! $result) {
            $this->error('Failed to save PDF: '.$pdf->getError());

            return 1;
        }

        $this->info("✅ Filled PDF saved to: {$outputPath}");

        // Optional: store it using Laravel’s Storage
        Storage::put("forms/enrollment_documents_fillable_gd_global_DRAFT_v1-{$timestamp}.pdf", file_get_contents($outputPath));

        return 0;
    }
}
