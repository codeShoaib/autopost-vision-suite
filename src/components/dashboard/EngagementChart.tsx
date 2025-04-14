
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { name: "Mon", twitter: 5, linkedin: 3, facebook: 2 },
  { name: "Tue", twitter: 7, linkedin: 4, facebook: 5 },
  { name: "Wed", twitter: 10, linkedin: 8, facebook: 3 },
  { name: "Thu", twitter: 15, linkedin: 7, facebook: 6 },
  { name: "Fri", twitter: 12, linkedin: 9, facebook: 8 },
  { name: "Sat", twitter: 8, linkedin: 6, facebook: 7 },
  { name: "Sun", twitter: 9, linkedin: 4, facebook: 5 },
];

export const EngagementChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Engagement Overview</CardTitle>
          <CardDescription>
            Track engagement across your social platforms
          </CardDescription>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="twitter"
              stroke="#1DA1F2"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="linkedin" stroke="#0A66C2" />
            <Line type="monotone" dataKey="facebook" stroke="#1877F2" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
