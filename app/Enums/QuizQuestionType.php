<?php

namespace App\Enums;

enum QuizQuestionType: string
{
    case SingleChoice = 'singleChoice';
    case MultipleChoice = 'multipleChoice';
    case ShortAnswer = 'shortAnswer';
}
