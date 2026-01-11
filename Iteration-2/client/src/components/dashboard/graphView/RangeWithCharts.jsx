import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import _ from 'lodash';

const RangeWithCharts = () => {
  const rangeRef = useRef(null);
  const bgChartRef = useRef(null);
  const fgChartRef = useRef(null);
  
  const [minValue, setMinValue] = useState(250);
  const [maxValue, setMaxValue] = useState(750);

  useEffect(() => {
    if (!rangeRef.current || !bgChartRef.current || !fgChartRef.current) return;

    // ✅ Prevent multiple initializations
    if (rangeRef.current.noUiSlider) return;

    // Initialize the background chart
    const bgChart = new ApexCharts(bgChartRef.current, {
      series: [{ name: 'Sales', data: [21, 20, 24, 45, 47, 50, 60, 70, 80, 75, 65, 55, 50, 40, 30, 30, 35, 45, 50, 60, 70, 80, 75, 65, 55, 50, 40, 35, 40] }],
      chart: { height: 150, type: 'bar', sparkline: { enabled: true } },
      xaxis: { type: 'category' },
      states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
      tooltip: { enabled: false },
      colors: ['#f3f4f6'],
      plotOptions: { bar: { colors: { ranges: [{ from: -45, to: 0, color: '#e5e7eb' }] } } },
      grid: { borderColor: '#e5e7eb' }
    });
    bgChart.render();

    // Initialize the foreground chart
    const fgChart = new ApexCharts(fgChartRef.current, {
      series: [{ name: 'Sales', data: [21, 20, 24, 45, 47, 50, 60, 70, 80, 75, 65, 55, 50, 40, 30, 30, 35, 45, 50, 60, 70, 80, 75, 65, 55, 50, 40, 35, 40] }],
      chart: { height: 150, type: 'bar', sparkline: { enabled: true } },
      xaxis: { type: 'category' },
      states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
      tooltip: { enabled: false },
      colors: ['#3b82f6'],
      plotOptions: { bar: { colors: { ranges: [{ from: -45, to: 0, color: '#ffffff' }] } } },
      grid: { borderColor: '#e5e7eb' }
    });
    fgChart.render();

    noUiSlider.create(rangeRef.current, {
      start: [250, 750],
      range: { min: 0, max: 1000 },
      connect: true,
    });

    const slider = rangeRef.current.noUiSlider;

    slider.on('update', (values) => {
      setMinValue(Number(values[0]));
      setMaxValue(Number(values[1]));
    });

    // Cleanup on unmount
    return () => {
      bgChart.destroy();
      fgChart.destroy();
      if (slider) {
        slider.destroy();
      }
    };
  }, []);

  const handleMinChange = (e) => {
    setMinValue(Number(e.target.value));
    rangeRef.current.noUiSlider.set([Number(e.target.value), maxValue]);
  };

  const handleMaxChange = (e) => {
    setMaxValue(Number(e.target.value));
    rangeRef.current.noUiSlider.set([minValue, Number(e.target.value)]);
  };

  return (
    <div className="p-5">
      <label className="sr-only">Example range</label>
      <div className="relative">
        <div ref={bgChartRef}></div>
        <div className="absolute top-0 start-0 w-full h-full overflow-hidden">
          <div ref={fgChartRef}></div>
        </div>
      </div>

      <div className="mt-4">
        <div ref={rangeRef}></div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium mb-2">Custom range:</div>
        <div className="flex flex-row space-x-4">
          <div className="basis-1/2">
            <input
              type="number"
              value={minValue}
              onChange={handleMinChange}
              className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="basis-1/2">
            <input
              type="number"
              value={maxValue}
              onChange={handleMaxChange}
              className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeWithCharts;
