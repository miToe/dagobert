import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Sector,
} from "recharts";

import {
  ChartsWrapper,
  Balance,
  ChartSection,
  SummarySection,
  PieChartContainer,
  LegendList,
  LegendItem,
  LegendColor,
  ValueText,
  CategoryName,
} from "@/src/components/styles/StyledCharts";
import { calculateBalancesAndData } from "@/src/utils/utils";
import { categories } from "@/src/data/categories";

export default function Charts({ transactions, onUpdateBalances }) {
  const [state, setState] = useState({
    isClient: false,
    income: 0,
    expenses: 0,
    maxValue: 0,
    pieData: [],
    chartData: [],
    activeIndex: -1,
  });

  useEffect(() => {
    const {
      totalIncome,
      totalExpenses,
      maxTransactionAmount,
      pieData,
      chartData,
    } = calculateBalancesAndData(transactions);

    setState((prevState) => ({
      ...prevState,
      isClient: true,
      income: totalIncome,
      expenses: totalExpenses,
      maxValue: maxTransactionAmount,
      pieData: pieData,
      chartData: chartData,
    }));

    if (typeof onUpdateBalances === "function") {
      onUpdateBalances(totalIncome, totalExpenses);
    }
  }, [transactions, onUpdateBalances]);

  const {
    isClient,
    income,
    expenses,
    maxValue,
    pieData,
    chartData,
    activeIndex,
  } = state;

  function onPieEnter(_, index) {
    setState((prevState) => ({
      ...prevState,
      activeIndex: index,
    }));
  }

  function onPieLeave() {
    setState((prevState) => ({
      ...prevState,
      activeIndex: -1,
    }));
  }

  function renderActiveShape(props) {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <CategoryName x={cx} y={cy - 10} textAnchor="middle">
          {payload.name}
        </CategoryName>
        <ValueText x={cx} y={cy + 10} textAnchor="middle">
          {`€${value.toFixed(2)}`}
        </ValueText>
      </g>
    );
  }

  function getCategoryColor(categoryName) {
    return categories[categoryName]?.color || "#8884d8"; // Default color if category not found
  }

  return (
    <ChartsWrapper>
      {isClient && (
        <ChartSection>
          <div>
            <h3>Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#82ca9d"
                  dot={false}
                />
                <Tooltip />
                <CartesianGrid stroke="#ccc" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, maxValue]}
                  axisLine={false}
                  tickLine={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <SummarySection>
              <Balance>
                <span>Gesamteinnahmen:</span>
                <span> {income.toFixed(2)}€</span>
              </Balance>
              <Balance>
                <span>Gesamtausgaben:</span>
                <span>{expenses.toFixed(2)}€</span>
              </Balance>
            </SummarySection>
          </div>
          <div>
            <h3>Categories</h3>
            <PieChartContainer>
              <ResponsiveContainer width="70%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius="90%"
                    labelLine={false}
                    dataKey="value"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getCategoryColor(entry.name)}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <LegendList>
                {pieData.map((entry, index) => (
                  <LegendItem
                    key={`item-${index}`}
                    onMouseEnter={() => onPieEnter(null, index)}
                    onMouseLeave={onPieLeave}
                  >
                    <LegendColor color={getCategoryColor(entry.name)} />
                    <span>{entry.name}</span>
                  </LegendItem>
                ))}
              </LegendList>
            </PieChartContainer>
          </div>
        </ChartSection>
      )}
    </ChartsWrapper>
  );
}
