import React, { useState } from "react";
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
import CalculatorButtons from "./CalculatorButtons";
import { monsters } from "../data/monsterData";
import { calculateDamage } from "../utils/damageCalculator";

const MonsterDamageCalculator = () => {
  const [playerStats, setPlayerStats] = useState({
    physicalDamage: {
      woodChopping: 3.52,
      rockBreaking: 3.52,
      mineralMining: 3.52,
      smashing: 6.57,
    },
    elementDamage: {
      fire: 0,
      cold: 0,
      lightning: 0,
      chaos: 53.14,
    },
    crystalShieldSkillDamage: 4,
  });

  const [checkedMonsters, setCheckedMonsters] = useState({});
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const handleStatChange = (category, type, value) => {
    setPlayerStats((prevStats) => ({
      ...prevStats,
      [category]: {
        ...prevStats[category],
        [type]: parseFloat(value) || 0,
      },
    }));
  };

  const handleMonsterCheck = (monsterName) => {
    setCheckedMonsters((prev) => ({
      ...prev,
      [monsterName]: !prev[monsterName],
    }));
  };

  const getHitsToKillColor = (hitsToKill) => {
    if (hitsToKill === 1) return "text-green-500";
    if (hitsToKill >= 2 && hitsToKill <= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const toggleShowSelected = () => {
    setShowSelectedOnly(!showSelectedOnly);
  };

  const filteredMonsters = showSelectedOnly
    ? monsters.filter((monster) => checkedMonsters[monster.name])
    : monsters;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Monster Damage Calculator</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(playerStats.physicalDamage).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} Damage
            </Label>
            <Input
              id={key}
              type="number"
              value={value}
              onChange={(e) =>
                handleStatChange("physicalDamage", key, e.target.value)
              }
            />
          </div>
        ))}
        {Object.entries(playerStats.elementDamage).map(([key, value]) => (
          <div key={key}>
            <Label htmlFor={`${key}Damage`}>
              {key.charAt(0).toUpperCase() + key.slice(1)} Damage
            </Label>
            <Input
              id={`${key}Damage`}
              type="number"
              value={value}
              onChange={(e) =>
                handleStatChange("elementDamage", key, e.target.value)
              }
            />
          </div>
        ))}
        <div>
          <Label htmlFor="crystalShieldSkillDamage">
            Crystal Shield Skill Damage
          </Label>
          <Input
            id="crystalShieldSkillDamage"
            type="number"
            value={playerStats.crystalShieldSkillDamage}
            onChange={(e) =>
              setPlayerStats((prev) => ({
                ...prev,
                crystalShieldSkillDamage: parseFloat(e.target.value) || 0,
              }))
            }
          />
        </div>
      </div>
      <CalculatorButtons onShowSelectedOnly={toggleShowSelected} />
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="border border-gray-300">Select</TableHead>
            <TableHead className="border border-gray-300">Monster</TableHead>
            <TableHead className="border border-gray-300">Type</TableHead>
            <TableHead className="border border-gray-300">HP</TableHead>
            <TableHead className="border border-gray-300">Physical</TableHead>
            <TableHead className="border border-gray-300">Element</TableHead>
            <TableHead className="border border-gray-300">Damage</TableHead>
            <TableHead className="border border-gray-300">Reflect</TableHead>
            <TableHead className="border border-gray-300">
              Total Damage
            </TableHead>
            <TableHead className="border border-gray-300">
              Hits to Kill
            </TableHead>
            <TableHead className="border border-gray-300">
              HP Remaining
            </TableHead>
            <TableHead className="border border-gray-300">Last Hit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMonsters.map((monster, index) => {
            const damageStats = calculateDamage(monster, playerStats);
            const colorClass = getHitsToKillColor(damageStats.hitsToKill);
            const uniqueKey = `${monster.name}-${monster.type}-${index}`;

            return (
              <TableRow key={uniqueKey}>
                <TableCell className="border border-gray-300">
                  <Checkbox
                    checked={checkedMonsters[monster.name] || false}
                    onCheckedChange={() => handleMonsterCheck(monster.name)}
                  />
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {monster.name}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {monster.type}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {monster.hp}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.physical}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.element}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.damage}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.reflect}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.totalDamage}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.hitsToKill}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.hpRemaining}
                </TableCell>
                <TableCell className={`border border-gray-300 ${colorClass}`}>
                  {damageStats.lastHitDamage}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonsterDamageCalculator;
