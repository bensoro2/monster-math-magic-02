import React from 'react';
import MonsterDamageCalculator from '../components/MonsterDamageCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Monster Damage Calculator</h1>
        <MonsterDamageCalculator />
      </div>
    </div>
  );
};

export default Index;
