import React from 'react';
import { Table } from "@/components/ui/table";

const MonsterDamageCalculator = () => {
  const playerStats = {
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
  };

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Monster Damage Calculator</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Monster</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>HP</Table.Head>
            <Table.Head>Physical</Table.Head>
            <Table.Head>Element</Table.Head>
            <Table.Head>Damage</Table.Head>
            <Table.Head>Reflect</Table.Head>
            <Table.Head>Total Damage</Table.Head>
            <Table.Head>Hits to Kill</Table.Head>
            <Table.Head>HP Remaining</Table.Head>
            <Table.Head>Last Hit</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {monsters.map((monster) => {
            const damageStats = calculateDamage(monster);
            return (
              <Table.Row key={monster.name}>
                <Table.Cell>{monster.name}</Table.Cell>
                <Table.Cell>{monster.type}</Table.Cell>
                <Table.Cell>{monster.hp}</Table.Cell>
                <Table.Cell>{damageStats.physical}</Table.Cell>
                <Table.Cell>{damageStats.element}</Table.Cell>
                <Table.Cell>{damageStats.damage}</Table.Cell>
                <Table.Cell>{damageStats.reflect}</Table.Cell>
                <Table.Cell>{damageStats.totalDamage}</Table.Cell>
                <Table.Cell>{damageStats.hitsToKill}</Table.Cell>
                <Table.Cell>{damageStats.hpRemaining}</Table.Cell>
                <Table.Cell>{damageStats.lastHitDamage}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MonsterDamageCalculator;