<?php

namespace App\Services;


use App\Models\Participant;
use App\Models\User;
use Illuminate\Support\Collection;

class ParticipantService {

    public function create(User $user, array $participantData): Participant
    {
        $participant = $user->participant()->create($participantData);

        if(isset($participantData['children_info'])) {
            $this->addChildren($participant, $participantData['children_info']);
        }

        return $participant;
    }

    public function addChildren(Participant $participant, array $childrenInfo): Collection
    {
        return $participant->children()->createMany($childrenInfo);
    }


}