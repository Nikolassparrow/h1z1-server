//   copyright (C) 2021 - 2022 H1emu community
//
//   https://github.com/QuentinGruber/h1z1-server
//   https://www.npmjs.com/package/h1z1-server
//
//   Based on https://github.com/psemu/soe-network
// ======================================================================

import { BaseSimpleNpc } from "./basesimplenpc";

export class simpleConstruction extends BaseSimpleNpc {
    health: number = 1000000;
    healthPercentage: number = 100;
    slot?: string;
    parentObjectCharacterId?: string;
    constructor(
        characterId: string,
        transientId: number,
        actorModelId: number,
        position: Float32Array,
        rotation: Float32Array,
        slot?: string,
        parentObjectCharacterId?: string,
    ) {
        super(characterId, transientId, actorModelId, position, rotation);
        if (slot) {
            this.slot = slot;
        }
        if (parentObjectCharacterId) {
            this.parentObjectCharacterId = parentObjectCharacterId;
        }
    }
    pGetConstructionHealth() {
        return {
            characterId: this.characterId,
            health: this.health / 10000,
        };
    }
    pDamageConstruction(damage: number) {
        this.health -= damage;
        this.healthPercentage = this.health / 10000;
    }
}
