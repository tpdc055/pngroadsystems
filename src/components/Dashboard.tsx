"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSystemSettings } from "@/contexts/SystemSettingsContext";
import { useLanguage, LanguageSelector } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  FileText,
  Shield,
  CheckCircle,
  BarChart3,
  Settings,
  Calculator,
  Activity,
  AlertTriangle,
  Building,
  Clock,
  Target,
  Truck,
  Map as MapIcon,
  Navigation
} from "lucide-react";
import ProjectManagement from "@/components/ProjectManagement";
import GPSMonitoring from "@/components/GPSMonitoring";
import GPSTaskEntry from "@/components/GPSTaskEntry";
import FinancialDashboard from "@/components/FinancialDashboard";
import ProjectProgressMonitoring from "@/components/ProjectProgressMonitoring";
import ProgressMapping from "@/components/ProgressMapping";
import HSEReports from "@/components/HSEReports";
import QualityManagement from "@/components/QualityManagement";
import ContractorManagement from "@/components/ContractorManagement";
import ReportsGenerator from "@/components/ReportsGenerator";
import SystemSettings from "@/components/SystemSettings";

// PNG Traditional Art Inspired Icons
const PNGIcons = {
  Projects: ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Mountain/Road pattern inspired by PNG landscapes */}
      <path d="M2 20 L12 4 L22 20 Z" opacity="0.6"/>
      <path d="M6 16 L12 8 L18 16 Z" opacity="0.8"/>
      <circle cx="12" cy="16" r="2"/>
      <path d="M8 14 L16 14" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),

  Financial: ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Traditional PNG currency/trade symbol */}
      <circle cx="12" cy="12" r="8" opacity="0.3"/>
      <path d="M8 8 L16 16 M16 8 L8 16" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="8" cy="8" r="2" opacity="0.7"/>
      <circle cx="16" cy="8" r="2" opacity="0.7"/>
      <circle cx="8" cy="16" r="2" opacity="0.7"/>
      <circle cx="16" cy="16" r="2" opacity="0.7"/>
    </svg>
  ),

  GPS: ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Island/navigation star pattern */}
      <circle cx="12" cy="12" r="10" opacity="0.2"/>
      <path d="M12 2 L14 8 L20 6 L16 12 L22 14 L16 16 L14 20 L12 14 L6 16 L10 12 L4 10 L10 8 Z" opacity="0.8"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),

  Progress: ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Traditional PNG weaving/progress pattern */}
      <rect x="2" y="6" width="20" height="3" opacity="0.4"/>
      <rect x="2" y="11" width="15" height="3" opacity="0.6"/>
      <rect x="2" y="16" width="10" height="3" opacity="0.8"/>
      <circle cx="20" cy="17.5" r="2"/>
      <path d="M18 15.5 L22 15.5" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
};

export default function Dashboard() {
  const { user, logout, login } = useAuth();
  const { settings } = useSystemSettings();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [financialSubTab, setFinancialSubTab] = useState("overview");
  const [activeView, setActiveView] = useState("overview");

  const navigationTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: Building2 },
    { id: "machine-tracking", label: "Machine Tracking", icon: Truck },
    { id: "project-tracking", label: "Project Tracking", icon: Navigation },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "hse", label: "HSE Reports", icon: Shield },
    { id: "quality", label: "Quality", icon: CheckCircle },
    { id: "contractors", label: "Contractors", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const financialSubTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "budget-actual", label: "Budget vs Actual", icon: Calculator },
    { id: "progress", label: "Progress Monitor", icon: Activity },
    { id: "unplanned", label: "Unplanned Costs", icon: AlertTriangle },
    { id: "cashflow", label: "Cash Flow", icon: TrendingUp },
    { id: "change-orders", label: "Change Orders", icon: FileText },
    { id: "funding", label: "Funding Sources", icon: Building },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
  ];

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      logout();
    }
  };

  const renderFinancialSubContent = () => {
    const mockProject = {
      id: "PNG001",
      name: "Mt. Hagen-Kagamuga Road Upgrade",
      budget: 25000000,
      progress: 65
    };

    switch (financialSubTab) {
      case "overview":
        return (
          <FinancialDashboard
            projectId={mockProject.id}
            projectName={mockProject.name}
            projectBudget={mockProject.budget}
            projectProgress={mockProject.progress}
          />
        );

      case "budget-actual":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual Analysis</CardTitle>
              <CardDescription>Detailed budget performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">K 25.0M</div>
                      <div className="text-sm text-gray-600">Total Budget</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">K 16.3M</div>
                      <div className="text-sm text-gray-600">Actual Spent</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">+5.2%</div>
                      <div className="text-sm text-gray-600">Budget Variance</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-96 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Budget vs Actual Chart</h3>
                    <p className="text-gray-600">Interactive budget comparison charts will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "progress":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Progress Monitoring</CardTitle>
              <CardDescription>Physical vs financial progress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">65%</div>
                      <div className="text-sm text-gray-600">Physical Progress</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">68%</div>
                      <div className="text-sm text-gray-600">Financial Progress</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">62%</div>
                      <div className="text-sm text-gray-600">Planned Progress</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-96 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Progress Monitoring Dashboard</h3>
                    <p className="text-gray-600">Physical vs financial progress comparison charts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "cashflow":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
              <CardDescription>Monitor project cash inflows and outflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">K 18.5M</div>
                      <div className="text-sm text-gray-600">Total Inflows</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">K 16.3M</div>
                      <div className="text-sm text-gray-600">Total Outflows</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">K 2.2M</div>
                      <div className="text-sm text-gray-600">Current Balance</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">K 3.1M</div>
                      <div className="text-sm text-gray-600">Next Month Forecast</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="h-96 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Cash Flow Dashboard</h3>
                    <p className="text-gray-600">Monthly cash flow charts and forecasting</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{financialSubTab.replace('-', ' ').toUpperCase()}</h3>
              <p className="text-gray-600 mb-4">This financial module is coming soon</p>
              <Button variant="outline">Coming Soon</Button>
            </CardContent>
          </Card>
        );
    }
  };

  const renderFinancialContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Management</h3>
          <div className="flex flex-wrap gap-2">
            {financialSubTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFinancialSubTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    financialSubTab === tab.id
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {renderFinancialSubContent()}
      </div>
    );
  };

  const renderPlaceholderContent = (title: string, description: string, icon: React.ComponentType<{ className?: string }>) => {
    const IconComponent = icon;
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <IconComponent className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button variant="outline">Coming Soon</Button>
        </CardContent>
      </Card>
    );
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Active Projects
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">K 155M</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Total Budget
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">57%</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Avg Progress
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">22</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Building2 className="h-4 w-4" />
                    PNG Provinces
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Welcome to PNG Road Construction Monitor</CardTitle>
                <CardDescription>Monitoring road construction projects across Papua New Guinea</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use the navigation tabs above to access different sections of the system.
                  Start by creating a new project or entering GPS data for existing projects.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "projects":
        return <ProjectManagement />;
      case "machine-tracking":
        return <GPSMonitoring />;
      case "project-tracking":
        return <ProgressMapping />;
      case "financial":
        return renderFinancialContent();
      case "hse":
        return <HSEReports />;
      case "quality":
        return <QualityManagement />;
      case "contractors":
        return <ContractorManagement />;
      case "reports":
        return <ReportsGenerator />;
      case "settings":
        return <SystemSettings />;
      default:
        return renderPlaceholderContent("Page Not Found", "The requested page could not be found", AlertTriangle);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* PNG Cultural Header Pattern */}
      <div className="h-2 png-gradient-flag"></div>

      <header className="bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg border-b png-border-red border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 64 64" className="w-6 h-6 text-white">
                  <path d="M8 56 L32 8 L56 56 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 40 L32 28 L44 40 L32 52 Z" fill="currentColor" opacity="0.6"/>
                  <circle cx="32" cy="40" r="3" fill="white" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold png-accent-black">
                  {settings?.systemName || t("header.title")}
                </h1>
                <p className="text-gray-600 text-sm">
                  {settings?.organizationName || t("header.subtitle")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Role Switcher for Demo */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                <span className="text-xs text-gray-600">Demo Role:</span>
                <select
                  value={user?.role || 'ADMIN'}
                  onChange={(e) => {
                    const roles = {
                      'ADMIN': { id: 'demo-admin-001', name: 'Demo Administrator', email: 'admin@png.gov.pg', role: 'ADMIN' as const },
                      'PROJECT_MANAGER': { id: 'demo-manager-001', name: 'Demo Project Manager', email: 'manager@png.gov.pg', role: 'PROJECT_MANAGER' as const },
                      'SITE_ENGINEER': { id: 'demo-engineer-001', name: 'Demo Site Engineer', email: 'engineer@png.gov.pg', role: 'SITE_ENGINEER' as const },
                      'FINANCIAL_OFFICER': { id: 'demo-finance-001', name: 'Demo Financial Officer', email: 'finance@png.gov.pg', role: 'FINANCIAL_OFFICER' as const }
                    };
                    const newUser = roles[e.target.value as keyof typeof roles];
                    // Simulate a role change by calling login with the new user
                    login(newUser.email, 'demo123');
                  }}
                  className="text-xs bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="ADMIN">Administrator</option>
                  <option value="PROJECT_MANAGER">Project Manager</option>
                  <option value="SITE_ENGINEER">Site Engineer</option>
                  <option value="FINANCIAL_OFFICER">Financial Officer</option>
                </select>
              </div>

              <LanguageSelector />

              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.role?.replace('_', ' ')}</div>
                </div>
              </div>

              <span className="text-sm text-gray-700">{t("header.welcome")}, {user?.name || "Administrator"}</span>
              <Badge variant="secondary" className="png-bg-yellow text-black">
                {user?.role || "ADMIN"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                {t("action.signout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b png-border-yellow border-opacity-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationTabs.map((tab, index) => {
              const IconComponent = tab.icon;
              const pngColors = ["png-bg-red text-white", "png-bg-yellow text-black", "png-bg-black text-white"];
              const activeColor = pngColors[index % pngColors.length];

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "financial") {
                      setFinancialSubTab("overview");
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 relative overflow-hidden ${
                    activeTab === tab.id
                      ? `${activeColor} shadow-md`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 png-pattern-leaves opacity-10"></div>
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderMainContent()}
      </main>
    </div>
  );
}
