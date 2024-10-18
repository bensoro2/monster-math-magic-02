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
import CalculatorButtons from './CalculatorButtons';
import { monsters } from '../data/monsterData';
import { calculateDamage } from '../utils/damageCalculator';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMonsters = monsters.filter(monster => 
    (!showCheckedOnly || checkedMonsters[monster.name]) &&
    (monster.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     monster.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getHitsToKillColor = (hitsToKill) => {
    if (hitsToKill === 1) return 'text-green-500';
    if (hitsToKill >= 2 && hitsToKill <= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

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
          <Label htmlFor="searchTerm">Search by Monster Type or Name</Label>
          <Input
            id="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter monster type or name..."
          />
        </div>
      </div>
      <CalculatorButtons showCheckedOnly={showCheckedOnly} setShowCheckedOnly={setShowCheckedOnly} />
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
            const damageStats = calculateDamage(monster, playerStats);
            const colorClass = getHitsToKillColor(damageStats.hitsToKill);
            return (
              <TableRow key={monster.name}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`check-${monster.name}`}
                      checked={checkedMonsters[monster.name] || false}
                      onCheckedChange={() => handleMonsterCheck(monster.name)}
                    />
                    <label htmlFor={`check-${monster.name}`} className={colorClass}>{monster.name}</label>
                  </div>
                </TableCell>
                <TableCell className={colorClass}>{monster.type}</TableCell>
                <TableCell className={colorClass}>{monster.hp}</TableCell>
                <TableCell className={colorClass}>{damageStats.physical}</TableCell>
                <TableCell className={colorClass}>{damageStats.element}</TableCell>
                <TableCell className={colorClass}>{damageStats.damage}</TableCell>
                <TableCell className={colorClass}>{damageStats.reflect}</TableCell>
                <TableCell className={colorClass}>{damageStats.totalDamage}</TableCell>
                <TableCell className={colorClass}>
                  {damageStats.hitsToKill}
                </TableCell>
                <TableCell className={colorClass}>{damageStats.hpRemaining}</TableCell>
                <TableCell className={colorClass}>{damageStats.lastHitDamage}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonsterDamageCalculator;