import React from "react";

type TradeoffAxis = {
  dimension: string;
  level: "low" | "medium" | "high";
  explanation: string;
};

type TradeoffsProps = {
  tradeoffs: {
    axes: TradeoffAxis[];
    summary: string;
  },

};

const levelStyles = {
  low: "w-1/4 bg-violet-500",
  medium: "w-2/4 bg-violet-500",
  high: "w-3/4 bg-violet-500",
};

export const TradeoffsCard = ({ tradeoffs, onSelect, isSelected }:{tradeoffs: TradeoffsProps["tradeoffs"], onSelect?: (block: any) => void, isSelected?: boolean}) => {
  return (
    <section onClick={() => onSelect && onSelect({ data: tradeoffs, cardType: 'tradeoffs' })} className={`rounded-2xl  bg-neutral-900 p-6 shadow-sm cursor-pointer hover:border-violet-400 border-2 border-neutral-900 transition ${isSelected ? ' border-violet-500' : ''}`}>
      <h3 className="text-xl font-serif mb-1 italic tracking-wide text-neutral-100">
        Tradeoffs
      </h3>
      <p className="text-neutral-400 text-xs">
        Every product makes tradeoffs between competing goals. Here&apos;s how this
        product balances them:
      </p>

      <div className="mt-4 space-y-5">
        {tradeoffs.axes.map((axis, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-200">
                {axis.dimension}
              </span>
              <span className="text-xs text-neutral-300 capitalize">
                {axis.level}
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-neutral-200">
              <div
                className={`h-2 rounded-full ${levelStyles[axis.level]}`}
              />
            </div>

            <p className="text-sm text-neutral-400">
              {axis.explanation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-neutral-800 pt-4">
        <p className="text-sm text-neutral-300">
          {tradeoffs.summary}
        </p>
      </div>
    </section>
  );
};
