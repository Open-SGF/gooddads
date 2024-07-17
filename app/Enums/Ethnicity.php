<?php
 
namespace App\Enum;
 
enum Ethnicity: string
{
    case White = 'white';
    case AfricanAmerican = 'africanAmerican';
    case NativeAmerican = 'nativeAmerican';
    case Asian = 'asian';
    case PacificIslander = 'pacificIslander';
}