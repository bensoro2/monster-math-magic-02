import React from 'react';
import { Button } from "@/components/ui/button";

const CalculatorButtons = ({ showCheckedOnly, setShowCheckedOnly }) => {
  return (
    <div className="mb-4 flex space-x-2">
      <Button onClick={() => setShowCheckedOnly(!showCheckedOnly)}>
        {showCheckedOnly ? "Show All Monsters" : "Show Checked Monsters Only"}
      </Button>
      <Button onClick={() => window.open("https://damage-from-monster-mmv.netlify.app/", "_blank")}>
        Defence
      </Button>
      <Button onClick={() => window.open("https://check-price-mmv.netlify.app/", "_blank")}>
        เช็คราคาเหรียญ
      </Button>
    </div>
  );
};

export default CalculatorButtons;
