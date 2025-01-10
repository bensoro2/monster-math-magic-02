import React from 'react';
import { Button } from "@/components/ui/button";

const CalculatorButtons = () => {
  return (
    <div className="mb-4 flex space-x-2">
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