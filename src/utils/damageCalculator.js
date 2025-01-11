export const calculateDamage = (monster, playerStats) => {
  let physicalDamage = 0;
  switch (monster.type) {
    case "Chopping wood":
      physicalDamage = playerStats.physicalDamage.woodChopping;
      break;
    case "Hitting rock":
      physicalDamage = playerStats.physicalDamage.rockBreaking;
      break;
    case "Mining":
      physicalDamage = playerStats.physicalDamage.mineralMining;
      break;
    case "Smashing":
      physicalDamage = playerStats.physicalDamage.smashing;
      break;
    default:
      physicalDamage = 0;
  }

  const physicalDamageAfterResistance = physicalDamage * (1 - monster.resistances.physical / 100);
  const fireDamageAfterResistance = playerStats.elementDamage.fire * (1 - monster.resistances.fire / 100);
  const coldDamageAfterResistance = playerStats.elementDamage.cold * (1 - monster.resistances.cold / 100);
  const lightningDamageAfterResistance = playerStats.elementDamage.lightning * (1 - monster.resistances.lightning / 100);
  const chaosDamageAfterResistance = playerStats.elementDamage.chaos * (1 - monster.resistances.chaos / 100);
  
  const totalElementalDamage = fireDamageAfterResistance + coldDamageAfterResistance + lightningDamageAfterResistance + chaosDamageAfterResistance;
  const baseDamage = physicalDamageAfterResistance + totalElementalDamage;

  const reflectDamage = playerStats.crystalShieldSkillDamage - (playerStats.crystalShieldSkillDamage * monster.resistances.cold / 100);

  const totalDamage = baseDamage + reflectDamage;
  const hitsToKill = Math.ceil(monster.hp / totalDamage);

  return {
    physical: physicalDamageAfterResistance.toFixed(2),
    element: totalElementalDamage.toFixed(2),
    damage: baseDamage.toFixed(2),
    reflect: reflectDamage.toFixed(2),
    totalDamage: totalDamage.toFixed(2),
    hitsToKill: hitsToKill,
    hpRemaining: (monster.hp - (hitsToKill - 1) * totalDamage).toFixed(2),
    lastHitDamage: (monster.hp - (hitsToKill - 1) * totalDamage).toFixed(2)
  };
};