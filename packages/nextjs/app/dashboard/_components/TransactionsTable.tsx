import { useEffect, useState } from "react";
import { TransactionHash } from "./TransactionHash";
import { formatUnits } from "viem";
import { formatCurrency } from "~~/utils/3FContract/currencyConvertion";
import { getDateAndTimeFromTimestamp } from "~~/utils/3FContract/timestampFormatter";

interface Transaction {
  hash: string;
  value: string;
  timestamp: string;
  status: string;
}

type TransactionTableProps = {
  transactions: Transaction[] | null;
};

export const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  console.log(transactions);
  const [totalSavings, setTotalSavings] = useState<string[]>();

  useEffect(() => {
    if (!transactions) return;
    const createSavings = Array.from({ length: transactions.length }, (_, i) => `Ahorro-${i + 1}`);
    setTotalSavings(createSavings);
  }, [transactions]);

  if (!transactions) {
    return (
      <>
        <p>No desponible</p>
      </>
    );
  }

  return (
    <div className="flex justify-center max-h-56 overflow-y-auto">
      <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
        <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
          <thead>
            <tr className="rounded-xl text-sm text-base-content">
              <th className="bg-primary">Valor</th>
              <th className="bg-primary">Hash</th>
              <th className="bg-primary">Fecha y hora</th>
              <th className="bg-primary">Tiempo para retiro</th>
              <th className="bg-primary">Ahorro</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => {
              const hash = tx.hash;
              // const status = transactionReceipts[hash].status;
              const { date, time } = getDateAndTimeFromTimestamp(tx.timestamp);
              const value = formatUnits(BigInt(tx.value), 6);
              return (
                <tr key={hash} className="hover text-sm">
                  <td className="text-center text-xs md:py-4">
                    {formatCurrency(Number(value))} <span className="font-semibold text-xs">USDT</span>
                  </td>
                  <td className="w-1/12 md:py-4">
                    <TransactionHash hash={hash} />
                  </td>
                  <td className="w-2/1 md:py-4 text-xs">
                    <span className="font-bold">{date}</span>
                    <span className="font-light ml-4">{time}</span>
                  </td>
                  <td className="w-2/1 md:py-4">Tiempo para retiro</td>
                  <td className="w-2/12 md:py-4">{totalSavings ? totalSavings[i] : "No disponible"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
