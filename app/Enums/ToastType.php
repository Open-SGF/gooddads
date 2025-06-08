<?php

namespace App\Enums;

enum ToastType: string
{
    case Success = 'success';
    case Error = 'error';
    case Info = 'info';
    case Warning = 'warning';
}
