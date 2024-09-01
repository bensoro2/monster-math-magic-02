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
    skillDamage: 4
  });

  const monsters = [
    { name: "Jello-Bello Spirit", type: "Smashing", hp: 56, resistances: { physical: 50, fire: 25, cold: 40, lightning: 40, chaos: 0 } },
    { name: "Cacto Spirit", type: "Chopping wood", hp: 75, resistances: { physical: 50, fire: 10, cold: 30, lightning: 65, chaos: 15 } },
    { name: "Rock Golem Spirit", type: "Hitting rock", hp: 116, resistances: { physical: 80, fire: 30, cold: 10, lightning: 30, chaos: 10 } },
    { name: "Treant Spirit", type: "Chopping wood", hp: 192, resistances: { physical: 60, fire: 10, cold: 45, lightning: 30, chaos: 65 } },
    { name: "Magma Golem Spirit", type: "Hitting rock", hp: 201, resistances: { physical: 60, fire: 90, cold: 10, lightning: 55, chaos: 45 } },
    { name: "Hedgenox Spirit", type: "Smashing", hp: 184, resistances: { physical: 60, fire: 50, cold: 80, lightning: 60, chaos: 10 } },
    { name: "Shimmer Spirit", type: "Mining", hp: 196, resistances: { physical: 60, fire: 70, cold: 70, lightning: 10, chaos: 50 } },
    { name: "Gigatron Spirit", type: "Mining", hp: 349, resistances: { physical: 70, fire: 65, cold: 65, lightning: 0, chaos: 65 } },
    { name: "Guardian of Gaia Spirit", type: "Chopping wood", hp: 352, resistances: { physical: 70, fire: 25, cold: 45, lightning: 90, chaos: 60 } },
    { name: "Terra Golem Spirit", type: "Hitting rock", hp: 363, resistances: { physical: 70, fire: 90, cold: 25, lightning: 25, chaos: 35 } },
    { name: "Crocobeast Spirit", type: "Smashing", hp: 345, resistances: { physical: 70, fire: 60, cold: 80, lightning: 45, chaos: 25 } }
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
    const elementDamageAfterResistance = playerStats.elementDamage.chaos * (1 - monster.resistances.chaos / 100);
    const totalDamage = physicalDamageAfterResistance + elementDamageAfterResistance;
    const reflectDamage = totalDamage * 0.04; // 4% reflect damage
    const hitsToKill = Math.ceil(monster.hp / totalDamage);

    return {
      physical: physicalDamageAfterResistance.toFixed(2),
      element: elementDamageAfterResistance.toFixed(2),
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

  const handleElementDamageChange = (value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      elementDamage: {
        ...prevStats.elementDamage,
        chaos: parseFloat(value) || 0
      }
    }));
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
          <Label htmlFor="chaosDamage">Chaos Damage</Label>
          <Input
            id="chaosDamage"
            type="number"
            value={playerStats.elementDamage.chaos}
            onChange={(e) => handleElementDamageChange(e.target.value)}
          />
        </div>
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
          {monsters.map((monster) => {
            const damageStats = calculateDamage(monster);
            return (
              <TableRow key={monster.name}>
                <TableCell>{monster.name}</TableCell>
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
