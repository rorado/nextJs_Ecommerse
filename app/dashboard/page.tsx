"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MotionConfig, motion } from "framer-motion";
import { Settings, Users, LayoutGrid, LineChart } from "lucide-react";

const data = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 220 },
  { name: "May", value: 180 },
  { name: "Jun", value: 260 },
];


export default function DashboardPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-text p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <Button className="bg-primary text-primary-contrast hover:bg-primary-dark">Add New</Button>
            <Button variant="outline" className="border-border text-text hover:bg-hover">Settings</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[{icon: Users, label: "Users", value: "12,430"}, {icon: LayoutGrid, label: "Projects", value: "248"}, {icon: LineChart, label: "Revenue", value: "$24,500"}, {icon: Settings, label: "Active Systems", value: "14"}].map((item, i) => (
            <motion.div key={i} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: i * 0.1}}>
              <Card className="shadow-soft bg-surface border-border rounded-radius">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-text-muted">{item.label}</CardTitle>
                  <item.icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="xl:col-span-2">
            <Card className="shadow-soft bg-surface border-border rounded-radius h-full">
              <CardHeader>
                <CardTitle className="text-xl">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
