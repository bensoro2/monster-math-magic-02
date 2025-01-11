import React from "react";
import { Button } from "@/components/ui/button";

const CalculatorButtons = ({ onShowSelectedOnly }) => {
  const buttons = [
    {
      id: "defence",
      label: "Defence",
      onClick: () =>
        window.open("https://damage-from-monster-mmv.netlify.app/", "_blank"),
    },
    {
      id: "price",
      label: "เช็คราคาเหรียญ",
      onClick: () =>
        window.open("https://check-price-mmv.netlify.app/", "_blank"),
    },
    {
      id: "selected",
      label: "Show Selected Only",
      onClick: onShowSelectedOnly,
    },
  ];

  return (
    <div className="mb-4 flex space-x-2">
      {buttons.map((button) => (
        <Button key={button.id} onClick={button.onClick}>
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default CalculatorButtons;
