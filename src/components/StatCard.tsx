
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  color?: "blue" | "green" | "amber" | "red";
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = "blue",
  className,
}: StatCardProps) => {
  const colorVariants = {
    blue: "bg-blue-50 text-blockchain-blue",
    green: "bg-green-50 text-blockchain-success",
    amber: "bg-amber-50 text-blockchain-warning",
    red: "bg-red-50 text-blockchain-danger",
  };

  return (
    <Card className={cn("blockchain-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("rounded-full p-1", colorVariants[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1",
                trend.positive ? "text-blockchain-success" : "text-blockchain-danger"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
