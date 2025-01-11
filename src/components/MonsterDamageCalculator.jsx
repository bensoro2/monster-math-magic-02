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
    physical: {
      attack: 0,
      defense: 0,
      penetration: 0,
    },
    elemental: {
      attack: 0,
      defense: 0,
      penetration: 0,
    },
    skills: {
      crystalShieldSkillDamage: 4,
    },
  });

  const [checkedMonsters, setCheckedMonsters] = useState(
    monsters.reduce(
      (acc, monster) => ({
        ...acc,
        [`${monster.name}-${monster.type}`]: false,
      }),
      {}
    )
  );

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

  const handleMonsterCheck = (monster) => {
    const key = `${monster.name}-${monster.type}`;
    setCheckedMonsters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getHitsToKillColor = (hits) => {
    if (hits === 1) return "text-green-500";
    if (hits >= 2 && hits <= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const toggleShowSelected = () => {
    setShowSelectedOnly(!showSelectedOnly);
  };

  const filteredMonsters = showSelectedOnly
    ? monsters.filter(
        (monster) => checkedMonsters[`${monster.name}-${monster.type}`] === true
      )
    : monsters;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <h3 className="font-bold mb-2">Physical Stats</h3>
          <div className="space-y-2">
            <div>
              <Label>Attack</Label>
              <Input
                type="number"
                value={playerStats.physical.attack}
                onChange={(e) =>
                  handleStatChange("physical", "attack", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Defense</Label>
              <Input
                type="number"
                value={playerStats.physical.defense}
                onChange={(e) =>
                  handleStatChange("physical", "defense", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Penetration</Label>
              <Input
                type="number"
                value={playerStats.physical.penetration}
                onChange={(e) =>
                  handleStatChange("physical", "penetration", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Elemental Stats</h3>
          <div className="space-y-2">
            <div>
              <Label>Attack</Label>
              <Input
                type="number"
                value={playerStats.elemental.attack}
                onChange={(e) =>
                  handleStatChange("elemental", "attack", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Defense</Label>
              <Input
                type="number"
                value={playerStats.elemental.defense}
                onChange={(e) =>
                  handleStatChange("elemental", "defense", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Penetration</Label>
              <Input
                type="number"
                value={playerStats.elemental.penetration}
                onChange={(e) =>
                  handleStatChange("elemental", "penetration", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Skills</h3>
          <div className="space-y-2">
            <div>
              <Label>Crystal Shield Skill Damage</Label>
              <Input
                type="number"
                value={playerStats.skills.crystalShieldSkillDamage}
                onChange={(e) =>
                  handleStatChange(
                    "skills",
                    "crystalShieldSkillDamage",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      <CalculatorButtons
        onShowSelected={toggleShowSelected}
        showSelectedOnly={showSelectedOnly}
      />

      <div className="overflow-x-auto">
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
                HP Remaining
              </TableHead>
              <TableHead className="border border-gray-300">Last Hit</TableHead>
              <TableHead className="border border-gray-300">
                Hits to Kill
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMonsters.map((monster) => {
              const damageStats = calculateDamage(monster, playerStats);
              const colorClass = getHitsToKillColor(damageStats.hitsToKill);
              const monsterKey = `${monster.name}-${monster.type}`;

              return (
                <TableRow key={monsterKey}>
                  <TableCell className="border border-gray-300">
                    <Checkbox
                      checked={checkedMonsters[monsterKey] || false}
                      onCheckedChange={() => handleMonsterCheck(monster)}
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
                    {monster.physical}
                  </TableCell>
                  <TableCell className={`border border-gray-300 ${colorClass}`}>
                    {monster.element}
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
                    {damageStats.hpRemaining}
                  </TableCell>
                  <TableCell className={`border border-gray-300 ${colorClass}`}>
                    {damageStats.lastHit}
                  </TableCell>
                  <TableCell className={`border border-gray-300 ${colorClass}`}>
                    {damageStats.hitsToKill}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MonsterDamageCalculator;
