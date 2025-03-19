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

    /**
     * Create or update a participant's disclosure authorization.
     *
     * @param \App\Models\Participant $participant
     * @param array $data
     * @return \App\Models\ParticipantDisclosureAuthorization
     */
    public function createOrUpdateDisclosureAuthorization($participant, array $data)
    {
        // Check if the participant already has a disclosure authorization
        if ($participant->disclosureAuthorization) {
            // Update existing authorization
            $participant->disclosureAuthorization->update($data);
            return $participant->disclosureAuthorization;
        }
        
        // Create new authorization
        return $participant->disclosureAuthorization()->create($data);
    }

}