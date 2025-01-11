export const calculateDamage = (monster, playerStats) => {
  // Initialize default values for physical damage based on monster type
  const physicalDamageByType = {
    'Smashing': playerStats.physical.attack || 0,
    'Hitting rock': playerStats.physical.attack || 0,
    'Mining': playerStats.physical.attack || 0,
    'Chopping wood': playerStats.physical.attack || 0
  };

  // Get physical damage based on monster type, default to 0 if type not found
  const physicalDamage = physicalDamageByType[monster.type] || 0;

  // Calculate physical damage after resistance
  const physicalDamageAfterResistance = physicalDamage * (1 - (monster.resistances.physical || 0) / 100);

  // Calculate elemental damages after resistances
  const elementalDamage = playerStats.elemental.attack || 0;
  const elementalDamageAfterResistance = elementalDamage * (1 - (monster.resistances.fire || 0) / 100);

  // Calculate crystal shield skill damage
  const crystalShieldDamage = (playerStats.skills.crystalShieldSkillDamage || 0) * (1 - (monster.resistances.cold || 0) / 100);

  // Calculate total damage
  const baseDamage = physicalDamageAfterResistance + elementalDamageAfterResistance;
  const totalDamage = baseDamage + crystalShieldDamage;

  // Calculate hits to kill
  const hitsToKill = Math.ceil(monster.hp / totalDamage);
  const lastHit = monster.hp - ((hitsToKill - 1) * totalDamage);

  return {
    damage: baseDamage.toFixed(2),
    reflect: crystalShieldDamage.toFixed(2),
    totalDamage: totalDamage.toFixed(2),
    hitsToKill: hitsToKill,
    hpRemaining: lastHit.toFixed(2),
    lastHit: lastHit.toFixed(2)
  };
};