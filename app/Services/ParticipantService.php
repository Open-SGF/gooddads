<?php

namespace App\Services;

use App\Data\ChildData;
use App\Models\Participant;
use App\Data\ParticipantData;
use Illuminate\Support\Collection;

class ParticipantService
{
    public function create(Participant $participant, ParticipantData $participantData)
    {
        if (isset($participantData['childrenInfo'])) {
            $this->addChildren($participant, $participantData['childrenInfo']);
        }

        return $participantData;
    }

    public function addChildren(Participant $participant, array $childrenInfo): Collection
    {
        $children = [];

        foreach ($childrenInfo as $childInfo) {
            $children[] = ChildData::from($childInfo)->toArray();
        }

        return $participant->children()->createMany($children);
    }
}
