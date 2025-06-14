<?php

namespace App\Http\Controllers;

use App\Services\PdfIntakeFormService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PdfController extends Controller
{
    public function generateFake(PdfIntakeFormService $pdfService)
    {
        // Create a fake participant object with fields expected by the config
        $fakeParticipant = (object) [
            'id' => 999,
            'full_name' => 'John Doe',
            'submission_date' => now(),
        ];

        try {
            $pdfPath = $pdfService->generate($fakeParticipant);
            return Storage::download($pdfPath);
        } catch (\Exception $e) {
            return response("Failed to generate PDF: " . $e->getMessage(), 500);
        }
    }
}
