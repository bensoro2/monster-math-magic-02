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
import { monsters } from '../data/monsterData';

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
  const [typeFilter, setTypeFilter] = useState('');

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

  const handleStatChange = (category, type, value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      [category]: {
        ...prevStats[category],
        [type]: parseFloat(value) || 0
      }
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

  const filteredMonsters = monsters.filter(monster => 
    (!showCheckedOnly || checkedMonsters[monster.name]) &&
    (typeFilter === '' || monster.type.toLowerCase().includes(typeFilter.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Monster Damage Calculator</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(playerStats.physicalDamage).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Damage</Label>
            <Input
              id={key}
              type="number"
              value={value}
              onChange={(e) => handleStatChange('physicalDamage', key, e.target.value)}
            />
          </div>
        ))}
        {Object.entries(playerStats.elementDamage).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={`${key}Damage`}>{key.charAt(0).toUpperCase() + key.slice(1)} Damage</Label>
            <Input
              id={`${key}Damage`}
              type="number"
              value={value}
              onChange={(e) => handleStatChange('elementDamage', key, e.target.value)}
            />
          </div>
        ))}
        <div>
          <Label htmlFor="crystalShieldSkillDamage">Crystal Shield Skill Damage</Label>
          <Input
            id="crystalShieldSkillDamage"
            type="number"
            value={playerStats.crystalShieldSkillDamage}
            onChange={(e) => setPlayerStats(prev => ({ ...prev, crystalShieldSkillDamage: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div>
          <Label htmlFor="typeFilter">Filter by Monster Type</Label>
          <Input
            id="typeFilter"
            type="text"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Enter monster type..."
          />
        </div>
      </div>
      <div className="mb-4 flex space-x-2">
        <Button onClick={toggleShowCheckedOnly}>
          {showCheckedOnly ? "Show All Monsters" : "Show Checked Monsters Only"}
        </Button>
        <Button onClick={() => window.open("https://preview--calculate-monster-mania.gptengineer.run/", "_blank")}>
          Defence
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
            <TableHead>Damage</TableHead>
            <TableHead>Reflect</TableHead>
            <TableHead>Total Damage</TableHead>
            <TableHead>Hits to Kill</TableHead>
            <TableHead>HP Remaining</TableHead>
            <TableHead>Last Hit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMonsters.map((monster) => {
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