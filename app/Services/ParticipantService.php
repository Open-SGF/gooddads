<?php

namespace App\Services;

use App\Data\ChildData;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Support\Collection;

class ParticipantService
{
    public function create(ParticipantData $participant)
    {
        if (isset($participantData['childrenInfo'])) {
            $this->addChildren($participant, $participantData['childrenInfo']);
        }

        return $participant;
    }

    public function addChildren(Participant $participant, array $childrenInfo): Collection
    {
        $children = [];

        foreach ($childrenInfo as $childInfo) {
            $children[] = ChildData::fromArray($childInfo)->toArray();
        }

        return $participant->children()->createMany($children);
    }
}
