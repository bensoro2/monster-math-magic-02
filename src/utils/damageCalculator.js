export const calculateDamage = (monster, playerStats) => {
  // Initialize damage values
  const physicalDamage = playerStats.physical?.attack || 0;
  const elementalDamage = playerStats.elemental?.attack || 0;
  
  // Calculate physical damage after resistance
  const physicalDamageAfterResistance = physicalDamage * (1 - (monster.resistances.physical || 0) / 100);
  
  // Calculate elemental damages after resistances
  const fireDamageAfterResistance = elementalDamage * (1 - (monster.resistances.fire || 0) / 100);
  const coldDamageAfterResistance = elementalDamage * (1 - (monster.resistances.cold || 0) / 100);
  const lightningDamageAfterResistance = elementalDamage * (1 - (monster.resistances.lightning || 0) / 100);
  const chaosDamageAfterResistance = elementalDamage * (1 - (monster.resistances.chaos || 0) / 100);
  
  // Sum up all elemental damage
  const totalElementalDamage = fireDamageAfterResistance + coldDamageAfterResistance + 
    lightningDamageAfterResistance + chaosDamageAfterResistance;
  
  // Calculate base damage
  const baseDamage = physicalDamageAfterResistance + totalElementalDamage;
  
  // Calculate reflect damage (using crystal shield skill)
  const reflectDamage = (playerStats.skills?.crystalShieldSkillDamage || 0) * 
    (1 - (monster.resistances.cold || 0) / 100);
  
  // Calculate total damage
  const totalDamage = baseDamage + reflectDamage;
  
  // Calculate hits to kill
  const hitsToKill = Math.ceil(monster.hp / totalDamage);
  
  // Calculate remaining HP for last hit
  const hpRemaining = monster.hp - ((hitsToKill - 1) * totalDamage);
  
  return {
    damage: baseDamage.toFixed(2),
    reflect: reflectDamage.toFixed(2),
    totalDamage: totalDamage.toFixed(2),
    hitsToKill,
    hpRemaining: hpRemaining.toFixed(2),
    lastHit: hpRemaining.toFixed(2)
  };
};