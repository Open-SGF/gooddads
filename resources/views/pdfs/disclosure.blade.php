<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Disclosure PDF</title>
    <style>
        body { font-family: sans-serif; }
        h1 { font-size: 18px; margin-bottom: 10px; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <h1>Disclosure Form</h1>

    <div class="section">
        <div><span class="label">Consumer Signature:</span> {{ $data->consumer_signature }}</div>
        <div><span class="label">Signature Date:</span> {{ $data->signature_date }}</div>
    </div>

    <div class="section">
        <div><span class="label">DSS Authorized:</span> {{ $data->is_dss_authorized ? 'Yes' : 'No' }}</div>
        <div><span class="label">MHD Authorized:</span> {{ $data->is_mhd_authorized ? 'Yes' : 'No' }}</div>
    </div>

    <!-- Add more fields as needed -->
</body>
</html>
