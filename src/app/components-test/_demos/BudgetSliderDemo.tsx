"use client";
import { useState } from "react";
import { BudgetSlider } from "@/components/design/BudgetSlider";

export function BudgetSliderDemo() {
  const [val, setVal] = useState<[number, number]>([0, 1500]);
  return <BudgetSlider value={val} onChange={setVal} />;
}
