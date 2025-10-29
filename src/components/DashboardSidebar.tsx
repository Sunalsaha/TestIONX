import { Home, FileText, Settings, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: FileText, label: "Exams", active: false },
    { icon: BarChart, label: "Results", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-0 -translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Menu</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                item.active
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-secondary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
