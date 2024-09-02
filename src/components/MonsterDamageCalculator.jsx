import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const MonsterDamageCalculator = () => {
  const [playerStats, setPlayerStats] = useState({
    physicalDamage: {
      woodChopping: 3.52,
      rockBreaking: 3.52,
      mineralMining: 3.52,
      smashing: 6.57
    },
    elementDamage: {
      fire: 0,
      cold: 0,
      lightning: 0,
      chaos: 53.14
    },
    crystalShieldSkillDamage: 4
  });

  const [checkedMonsters, setCheckedMonsters] = useState({});
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);

  const monsters = [
    { name: "Rat", type: "Smashing", hp: 35, resistances: { physical: 0, fire: 20, cold: 50, lightning: 20, chaos: 0 } },
    { name: "Snake", type: "Smashing", hp: 55, resistances: { physical: 10, fire: 25, cold: 70, lightning: 30, chaos: 0 } },
    { name: "Living Tree", type: "Chopping wood", hp: 69, resistances: { physical: 5, fire: 0, cold: 25, lightning: 60, chaos: 10 } },
    { name: "Rock Mole", type: "Hitting rock", hp: 58, resistances: { physical: 5, fire: 60, cold: 0, lightning: 40, chaos: 10 } },
    { name: "Man-Eating Flower", type: "Chopping wood", hp: 106, resistances: { physical: 0, fire: 5, cold: 30, lightning: 70, chaos: 10 } },
    { name: "Rock Golem", type: "Hitting rock", hp: 116, resistances: { physical: 10, fire: 80, cold: 0, lightning: 50, chaos: 10 } },
    { name: "Hedgenox", type: "Smashing", hp: 179, resistances: { physical: 20, fire: 40, cold: 75, lightning: 40, chaos: 0 } },
    { name: "Treant", type: "Chopping wood", hp: 185, resistances: { physical: 20, fire: 0, cold: 35, lightning: 80, chaos: 10 } },
    { name: "Magma Golem", type: "Hitting rock", hp: 193, resistances: { physical: 20, fire: 90, cold: 0, lightning: 55, chaos: 15 } },
    { name: "Iron Spiderling", type: "Mining", hp: 60, resistances: { physical: 0, fire: 35, cold: 35, lightning: 0, chaos: 30 } },
    { name: "Crystal Spiderling", type: "Mining", hp: 84, resistances: { physical: 5, fire: 45, cold: 25, lightning: 25, chaos: 40 } },
    { name: "Silver Spiderling", type: "Mining", hp: 110, resistances: { physical: 10, fire: 50, cold: 60, lightning: 5, chaos: 50 } },
    { name: "Copper Crab", type: "Mining", hp: 56, resistances: { physical: 0, fire: 35, cold: 35, lightning: 0, chaos: 30 } },
    { name: "Crystal Crab", type: "Mining", hp: 80, resistances: { physical: 5, fire: 45, cold: 25, lightning: 25, chaos: 40 } },
    { name: "Gold Crab", type: "Mining", hp: 107, resistances: { physical: 10, fire: 50, cold: 60, lightning: 5, chaos: 50 } },
    { name: "Hedgenyx", type: "Mining", hp: 140, resistances: { physical: 15, fire: 65, cold: 10, lightning: 65, chaos: 60 } },
    { name: "Gigatron", type: "Mining", hp: 212, resistances: { physical: 20, fire: 65, cold: 70, lightning: 10, chaos: 65 } },
    { name: "Jello-Bello", type: "Smashing", hp: 56, resistances: { physical: 0, fire: 25, cold: 40, lightning: 40, chaos: 0 } },
    { name: "Cacto", type: "Chopping wood", hp: 75, resistances: { physical: 15, fire: 10, cold: 30, lightning: 65, chaos: 15 } },
    { name: "Harvest Horror", type: "Chopping wood", hp: 99, resistances: { physical: 0, fire: 5, cold: 30, lightning: 70, chaos: 20 } },
    { name: "Shadowram", type: "Smashing", hp: 135, resistances: { physical: 20, fire: 30, cold: 70, lightning: 30, chaos: 10 } },
    { name: "Guardian of Gaia", type: "Chopping wood", hp: 323, resistances: { physical: 30, fire: 15, cold: 45, lightning: 90, chaos: 45 } },
    { name: "Terra Golem", type: "Hitting rock", hp: 339, resistances: { physical: 35, fire: 90, cold: 10, lightning: 55, chaos: 40 } },
    { name: "Crocobeast", type: "Smashing", hp: 304, resistances: { physical: 35, fire: 35, cold: 90, lightning: 35, chaos: 10 } },
    { name: "Lumiam", type: "Smashing", hp: 109, resistances: { physical: 15, fire: 40, cold: 60, lightning: 20, chaos: 5 } },
    { name: "Shimmer", type: "Mining", hp: 188, resistances: { physical: 20, fire: 70, cold: 70, lightning: 10, chaos: 50 } },
    { name: "Pook Pook", type: "Smashing", hp: 95, resistances: { physical: 0, fire: 20, cold: 60, lightning: 80, chaos: 5 } },
    { name: "Jibi", type: "Smashing", hp: 92, resistances: { physical: 0, fire: 30, cold: 80, lightning: 35, chaos: 0 } },
    { name: "Funga", type: "Chopping wood", hp: 110, resistances: { physical: 10, fire: 5, cold: 30, lightning: 60, chaos: 35 } },
    { name: "Echo", type: "Smashing", hp: 101, resistances: { physical: 5, fire: 25, cold: 60, lightning: 25, chaos: 5 } },
    { name: "White Jibi", type: "Smashing", hp: 97, resistances: { physical: 10, fire: 30, cold: 80, lightning: 35, chaos: 0 } },
    { name: "Chippy", type: "Smashing", hp: 129, resistances: { physical: 15, fire: 35, cold: 70, lightning: 35, chaos: 10 } },
    { name: "Striker", type: "Chopping wood", hp: 145, resistances: { physical: 25, fire: 15, cold: 30, lightning: 60, chaos: 15 } },
    { name: "Dirty Funga", type: "Chopping wood", hp: 141, resistances: { physical: 15, fire: 10, cold: 35, lightning: 70, chaos: 40 } },
    { name: "Thun-Thun", type: "Hitting rock", hp: 137, resistances: { physical: 20, fire: 60, cold: 10, lightning: 55, chaos: 15 } },
    { name: "Ivy", type: "Chopping wood", hp: 177, resistances: { physical: 20, fire: 5, cold: 30, lightning: 75, chaos: 35 } },
    { name: "Twister", type: "Hitting rock", hp: 186, resistances: { physical: 20, fire: 70, cold: 15, lightning: 40, chaos: 25 } },
    { name: "Giga Jibi", type: "Smashing", hp: 189, resistances: { physical: 20, fire: 35, cold: 75, lightning: 40, chaos: 5 } },
    { name: "Viper", type: "Smashing", hp: 107, resistances: { physical: 10, fire: 20, cold: 60, lightning: 20, chaos: 10 } },
    { name: "Eggnite", type: "Mining", hp: 142, resistances: { physical: 25, fire: 40, cold: 40, lightning: 5, chaos: 50 } },
    { name: "Ruin Guard", type: "Mining", hp: 203, resistances: { physical: 30, fire: 60, cold: 60, lightning: 10, chaos: 60 } },
    { name: "Varin", type: "Mining", hp: 383, resistances: { physical: 40, fire: 70, cold: 70, lightning: 10, chaos: 65 } },
    { name: "Garun", type: "Smashing", hp: 377, resistances: { physical: 40, fire: 60, cold: 70, lightning: 40, chaos: 20 } },
    { name: "Shinzu", type: "Chopping wood", hp: 395, resistances: { physical: 40, fire: 20, cold: 50, lightning: 80, chaos: 40 } },
    { name: "Jello-Bello Spirit", type: "Smashing", hp: 56, resistances: { physical: 50, fire: 25, cold: 40, lightning: 40, chaos: 0 } },
    { name: "Cacto Spirit", type: "Chopping wood", hp: 75, resistances: { physical: 50, fire: 10, cold: 30, lightning: 65, chaos: 15 } },
    { name: "Rock Golem Spirit", type: "Hitting rock", hp: 116, resistances: { physical: 80, fire: 30, cold: 10, lightning: 30, chaos: 10 } },
    { name: "Treant Spirit", type: "Chopping wood", hp: 192, resistances: { physical: 60, fire: 10, cold: 45, lightning: 80, chaos: 65 } },
    { name: "Magma Golem Spirit", type: "Hitting rock", hp: 201, resistances: { physical: 60, fire: 90, cold: 10, lightning: 55, chaos: 45 } },
    { name: "Hedgenox Spirit", type: "Smashing", hp: 184, resistances: { physical: 60, fire: 50, cold: 80, lightning: 60, chaos: 10 } },
    { name: "Shimmer Spirit", type: "Mining", hp: 196, resistances: { physical: 60, fire: 70, cold: 70, lightning: 10, chaos: 50 } },
    { name: "Gigatron Spirit", type: "Mining", hp: 349, resistances: { physical: 70, fire: 65, cold: 65, lightning: 25, chaos: 65 } },
    { name: "Guardian of Gaia Spirit", type: "Chopping wood", hp: 352, resistances: { physical: 70, fire: 15, cold: 45, lightning: 90, chaos: 60 } },
    { name: "Terra Golem Spirit", type: "Hitting rock", hp: 363, resistances: { physical: 70, fire: 90, cold: 25, lightning: 70, chaos: 35 } },
    { name: "Crocobeast Spirit", type: "Smashing", hp: 345, resistances: { physical: 70, fire: 60, cold: 90, lightning: 45, chaos: 25 } }
  ];

  const calculateDamage = (monster) => {
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
    const skillDamage = playerStats.crystalShieldSkillDamage;
    const totalDamage = physicalDamageAfterResistance + totalElementalDamage + skillDamage;
    const reflectDamage = skillDamage * 0.04; // 4% reflect damage, only from Crystal Shield Skill Damage
    const hitsToKill = Math.ceil(monster.hp / totalDamage);

    return {
      physical: physicalDamageAfterResistance.toFixed(2),
      element: totalElementalDamage.toFixed(2),
      skill: skillDamage.toFixed(2),
      damage: totalDamage.toFixed(2),
      reflect: reflectDamage.toFixed(2),
      totalDamage: (totalDamage + reflectDamage).toFixed(2),
      hitsToKill,
      hpRemaining: (monster.hp - (hitsToKill - 1) * totalDamage).toFixed(2),
      lastHitDamage: (monster.hp - (hitsToKill - 1) * totalDamage).toFixed(2)
    };
  };

  const handlePhysicalDamageChange = (type, value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      physicalDamage: {
        ...prevStats.physicalDamage,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handleElementDamageChange = (type, value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      elementDamage: {
        ...prevStats.elementDamage,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handleCrystalShieldSkillDamageChange = (value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      crystalShieldSkillDamage: parseFloat(value) || 0
    }));
  };

  const handleMonsterCheck = (monsterName) => {
    setCheckedMonsters(prev => ({
      ...prev,
      [monsterName]: !prev[monsterName]
    }));
  };

  const toggleShowCheckedOnly = () => {
    setShowCheckedOnly(!showCheckedOnly);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Monster Damage Calculator</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="woodChopping">Wood Chopping Damage</Label>
          <Input
            id="woodChopping"
            type="number"
            value={playerStats.physicalDamage.woodChopping}
            onChange={(e) => handlePhysicalDamageChange('woodChopping', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rockBreaking">Rock Breaking Damage</Label>
          <Input
            id="rockBreaking"
            type="number"
            value={playerStats.physicalDamage.rockBreaking}
            onChange={(e) => handlePhysicalDamageChange('rockBreaking', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="mineralMining">Mineral Mining Damage</Label>
          <Input
            id="mineralMining"
            type="number"
            value={playerStats.physicalDamage.mineralMining}
            onChange={(e) => handlePhysicalDamageChange('mineralMining', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="smashing">Smashing Damage</Label>
          <Input
            id="smashing"
            type="number"
            value={playerStats.physicalDamage.smashing}
            onChange={(e) => handlePhysicalDamageChange('smashing', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fireDamage">Fire Damage</Label>
          <Input
            id="fireDamage"
            type="number"
            value={playerStats.elementDamage.fire}
            onChange={(e) => handleElementDamageChange('fire', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="coldDamage">Cold Damage</Label>
          <Input
            id="coldDamage"
            type="number"
            value={playerStats.elementDamage.cold}
            onChange={(e) => handleElementDamageChange('cold', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="lightningDamage">Lightning Damage</Label>
          <Input
            id="lightningDamage"
            type="number"
            value={playerStats.elementDamage.lightning}
            onChange={(e) => handleElementDamageChange('lightning', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="chaosDamage">Chaos Damage</Label>
          <Input
            id="chaosDamage"
            type="number"
            value={playerStats.elementDamage.chaos}
            onChange={(e) => handleElementDamageChange('chaos', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="crystalShieldSkillDamage">Crystal Shield Skill Damage</Label>
          <Input
            id="crystalShieldSkillDamage"
            type="number"
            value={playerStats.crystalShieldSkillDamage}
            onChange={(e) => handleCrystalShieldSkillDamageChange(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <Button onClick={toggleShowCheckedOnly}>
          {showCheckedOnly ? "Show All Monsters" : "Show Checked Monsters Only"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Monster</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>HP</TableHead>
            <TableHead>Physical</TableHead>
            <TableHead>Element</TableHead>
            <TableHead>Crystal Shield</TableHead>
            <TableHead>Damage</TableHead>
            <TableHead>Reflect</TableHead>
            <TableHead>Total Damage</TableHead>
            <TableHead>Hits to Kill</TableHead>
            <TableHead>HP Remaining</TableHead>
            <TableHead>Last Hit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monsters.filter(monster => !showCheckedOnly || checkedMonsters[monster.name]).map((monster) => {
            const damageStats = calculateDamage(monster);
            return (
              <TableRow key={monster.name}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`check-${monster.name}`}
                      checked={checkedMonsters[monster.name] || false}
                      onCheckedChange={() => handleMonsterCheck(monster.name)}
                    />
                    <label htmlFor={`check-${monster.name}`}>{monster.name}</label>
                  </div>
                </TableCell>
                <TableCell>{monster.type}</TableCell>
                <TableCell>{monster.hp}</TableCell>
                <TableCell>{damageStats.physical}</TableCell>
                <TableCell>{damageStats.element}</TableCell>
                <TableCell>{damageStats.skill}</TableCell>
                <TableCell>{damageStats.damage}</TableCell>
                <TableCell>{damageStats.reflect}</TableCell>
                <TableCell>{damageStats.totalDamage}</TableCell>
                <TableCell>{damageStats.hitsToKill}</TableCell>
                <TableCell>{damageStats.hpRemaining}</TableCell>
                <TableCell>{damageStats.lastHitDamage}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonsterDamageCalculator;