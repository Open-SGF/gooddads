<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class IntakeFormMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;
    public $pdfPath;

    /**
     * Create a new message instance.
     */
    public function __construct($participant, $pdfPath)
    {
        $this->participant = $participant;
        $this->pdfPath = $pdfPath;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Intake Form for ' . ($this->participant->full_name ?? 'Participant')
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.intake-form',
            with: [
                'participant' => $this->participant,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [Attachment::fromStorage($this->pdfPath)
            ->as('intake-form.pdf')
            ->withMime('application/pdf')];
    }
}
