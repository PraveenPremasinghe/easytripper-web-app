"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";

// Approximate exchange rates (update these with real-time rates in production)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
  JPY: 149.5,
  INR: 83.1,
  LKR: 330, // Sri Lankan Rupee
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("LKR");

  const convertCurrency = () => {
    const amountNum = parseFloat(amount) || 0;
    if (amountNum <= 0) return "0.00";

    // Convert to USD first, then to target currency
    const amountInUSD = amountNum / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];

    return convertedAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const result = convertCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="from">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="to">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg bg-primary/10 p-4 text-center">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="text-2xl font-bold text-primary">
            {result} {toCurrency}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            *Approximate rates. Check current rates before travel.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}




