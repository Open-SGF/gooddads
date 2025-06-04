# PDF Generation for Intake Form Storage

- **Status:** Active  
- **Last Modified:** 2025-06-03  
- **Tags:** PDF, Laravel, Spatie, php-pdftk, document storage, intake process  

## Context and Problem Statement

Good Dads currently uses paper forms for new participant intake, which are signed and stored as hard copies. Our web application built with Laravel, Inertia, and React has digitized this 7-page intake form. Some data will persist in the database, but a portion must be stored in PDF format to mirror the original paper forms and meet signature/legal documentation requirements.

The challenge is: **What is the best way to generate and store signed PDFs of intake forms within our Laravel-based system, while maintaining a professional appearance, legal compliance, and ease of integration with participant data?**

## Decision Drivers

- Must support generation of PDF forms that include participant data
- Must support digital or scanned signatures
- Should be easily maintainable within the Laravel ecosystem
- Should allow reuse of form layout or appearance similar to existing paper forms
- Should scale with minimal complexity for future enhancements
- Legal/audit-friendly formatting and storage

## Options Considered

- **Option 1:** Generate PDFs using [Spatie/Browsershot](https://spatie.be/docs/browsershot/v3/introduction) (or DomPDF) from rendered HTML
- **Option 2:** Use [php-pdftk](https://github.com/mikehaertl/php-pdftk) to fill existing
fillable PDF templates
- **Option 3:** Hybrid/Alternative: Store both HTML and rendered PDF snapshots using DomPDF or another HTML-to-PDF converter with manual signature uploads

## Decision Outcome



### Positive Consequences



### Negative Consequences



## Pros and Cons of the Options

### Option 1: Spatie PDF (Browsershot or DomPDF)

- **Pros**
  - Good, because it fits well with Laravel/Inertia stack
  - Good, because form layout can be styled responsively with HTML/CSS
  - Good, because it supports multi-page rendering out of the box
- **Cons**
  - Bad, because it requires recreating layout in HTML/CSS
  - Bad, because managing precise form field positions may be time-consuming

### Option 2: php-pdftk

- **Pros**
  - Good, because it preserves an exact copy of the original fillable PDF form
  - Good, because field-level positioning and signatures are built into the form template
- **Cons**
  - Bad, because it introduces a dependency on external software (pdftk must be installed on server)
  - Bad, because maintaining field names and layouts in the source PDF is inflexible and harder to iterate on
  - Bad, because it does not integrate well with React components or live previewing

### Option 3: Hybrid (HTML snapshot with manual signature upload)

- **Pros**
  - Good, because it gives flexibility in both layout and signature collection
  - Good, because the HTML form can be stored alongside the PDF snapshot
- **Cons**
  - Bad, because managing and syncing signature uploads manually adds complexity
  - Bad, because validation and legal formatting of signatures needs extra handling

## Links

- [Spatie/Browsershot](https://spatie.be/docs/browsershot/v3/introduction)
- [php-pdftk GitHub](https://github.com/mikehaertl/php-pdftk)
- [DomPDF](https://github.com/dompdf/dompdf)
