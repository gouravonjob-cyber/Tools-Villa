import React, { useState } from "react";

export const AgeCalculatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [bdate, setBdate] = useState("1998-05-15");
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!bdate) return;
    const now = new Date();
    const birth = new Date(bdate);
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Get previous month days count
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const out = { years, months, days, totalDays, daysToNext };
    setResult(out);
    onResult(`Age: ${years} Years, ${months} Months, ${days} Days`);
  };

  return (
    <div id="comp-age-calc" className="space-y-4">
      <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <label className="text-xs text-slate-400">Select Birthday:</label>
        <input
          type="date"
          value={bdate}
          onChange={(e) => setBdate(e.target.value)}
          className="px-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-emerald-300 font-mono text-sm focus:outline-none"
        />
      </div>
      <button onClick={calculateAge} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Calculate Accurate Age
      </button>

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-xl font-bold text-white font-mono">{result.years}</p>
            <p className="text-[10px] text-slate-400">Years Old</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-xl font-bold text-white font-mono">{result.months}m {result.days}d</p>
            <p className="text-[10px] text-slate-400">Months & Days</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-xl font-bold text-white font-mono">{result.totalDays}</p>
            <p className="text-[10px] text-slate-400">Total Days past</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center col-span-2 md:col-span-1">
            <p className="text-xl font-bold text-indigo-300 font-mono">{result.daysToNext}</p>
            <p className="text-[10px] text-slate-400">Days to Birthday Countdown</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const BmiCalculatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const hMeters = height / 100;
    const value = weight / (hMeters * hMeters);
    setBmi(value);
    onResult(`BMI Resolved: ${value.toFixed(1)}`);
  };

  const getStatus = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-amber-300 bg-amber-500/10" };
    if (val < 25) return { label: "Normal Weight", color: "text-emerald-400 bg-emerald-500/10" };
    if (val < 30) return { label: "Overweight", color: "text-orange-400 bg-orange-500/10" };
    return { label: "Obesity Range", color: "text-rose-400 bg-rose-500/10" };
  };

  return (
    <div id="comp-bmi-calc" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Weight (Kilograms):</span> <span className="font-mono text-emerald-400">{weight} kg</span>
            </label>
            <input type="range" min="30" max="180" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-1 bg-slate-705 appearance-none cursor-pointer" />
          </div>
          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Height (Centimeters):</span> <span className="font-mono text-emerald-400">{height} cm</span>
            </label>
            <input type="range" min="100" max="230" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-1 bg-slate-705 appearance-none cursor-pointer" />
          </div>
          <button onClick={calculateBmi} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-xs font-bold transition">
            Calculate BMI Rank
          </button>
        </div>

        {bmi && (
          <div className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col items-center justify-center space-y-2">
            <span className="text-xs text-slate-400 font-mono uppercase">Calculated BMI Score</span>
            <p className="text-4xl font-extrabold text-white font-mono">{bmi.toFixed(1)}</p>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatus(bmi).color}`}>
              {getStatus(bmi).label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const PercentageCalculatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [val1, setVal1] = useState(25);
  const [val2, setVal2] = useState(200);
  const [pct, setPct] = useState<number | null>(null);

  const handleCalc = () => {
    const res = (val1 / 100) * val2;
    setPct(res);
    onResult(`Percentage: ${val1}% of ${val2} is ${res}`);
  };

  return (
    <div id="comp-percentage" className="space-y-4">
      <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl items-center">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">What is (Percentage):</label>
          <input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white font-mono" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Of (Number):</label>
          <input type="number" value={val2} onChange={(e) => setVal2(Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white font-mono" />
        </div>
      </div>
      <button onClick={handleCalc} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Solve Equation
      </button>
      {pct !== null && (
        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
          <span className="text-xs text-slate-400 block mb-1">Result:</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{val1}% of {val2} is <span className="text-white underline">{pct}</span></p>
        </div>
      )}
    </div>
  );
};

export const EmiCalculatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEmi = () => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emiVal = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(emiVal);
    onResult(`EMI: ${emiVal.toFixed(2)}/Mo`);
  };

  const totalPayment = emi ? emi * tenure * 12 : 0;
  const totalInterest = emi ? totalPayment - principal : 0;

  return (
    <div id="comp-emi-loan" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Loan Principal ($):</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white font-mono" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Interest Rate (Annual %):</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white font-mono" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Period (Years):</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white font-mono" />
        </div>
      </div>
      <button onClick={calculateEmi} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Calculate Mortgage Projections
      </button>

      {emi && (
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block">Monthly Repayment</span>
            <p className="text-lg font-bold text-emerald-300 font-mono">${emi.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block">Interest Burden</span>
            <p className="text-lg font-bold text-rose-300 font-mono">${totalInterest.toFixed(0)}</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block">Aggregate Output</span>
            <p className="text-lg font-bold text-white font-mono">${totalPayment.toFixed(0)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
