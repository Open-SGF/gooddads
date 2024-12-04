<?php

namespace App\Enums;

enum QuizQuestionType: string
{
    case True_False = 'trueFalse';
    case MultipleChoice = 'multipleChoice';
    case ShortAnswer = 'shortAnswer';
}
