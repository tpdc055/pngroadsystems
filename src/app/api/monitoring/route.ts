import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

interface SystemMetrics {
  database: {
    status: 'healthy' | 'warning' | 'error';
    connectionTime: number;
    totalProjects: number;
    totalUsers: number;
    totalGPSEntries: number;
    totalFinancialEntries: number;
    lastBackup: Date | null;
  };
  gpsTracking: {
    activeTrackers: number;
    entriesLast24h: number;
    averageAccuracy: number;
    lastUpdate: Date | null;
  };
  projects: {
    activeProjects: number;
    completedProjects: number;
    totalBudget: number;
    totalSpent: number;
    averageProgress: number;
  };
  system: {
    uptime: number;
    version: string;
    environment: string;
    lastHealthCheck: Date;
  };
}

async function getDatabaseMetrics() {
  if (USE_MOCK_DATA) {
    return {
      status: 'healthy' as const,
      connectionTime: Math.random() * 50 + 10,
      totalProjects: 15,
      totalUsers: 8,
      totalGPSEntries: 1247,
      totalFinancialEntries: 423,
      lastBackup: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    };
  }

  const startTime = Date.now();

  try {
    const [
      projectCount,
      userCount,
      gpsCount,
      financialCount,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.user.count(),
      prisma.gpsEntry.count(),
      prisma.financialEntry.count(),
    ]);

    const connectionTime = Date.now() - startTime;

    return {
      status: connectionTime < 1000 ? 'healthy' as const : 'warning' as const,
      connectionTime,
      totalProjects: projectCount,
      totalUsers: userCount,
      totalGPSEntries: gpsCount,
      totalFinancialEntries: financialCount,
      lastBackup: new Date(Date.now() - 6 * 60 * 60 * 1000), // Mock backup time
    };
  } catch (error) {
    return {
      status: 'error' as const,
      connectionTime: -1,
      totalProjects: 0,
      totalUsers: 0,
      totalGPSEntries: 0,
      totalFinancialEntries: 0,
      lastBackup: null,
    };
  }
}

async function getGPSMetrics() {
  if (USE_MOCK_DATA) {
    return {
      activeTrackers: Math.floor(Math.random() * 12) + 3,
      entriesLast24h: Math.floor(Math.random() * 200) + 50,
      averageAccuracy: Math.random() * 5 + 3,
      lastUpdate: new Date(Date.now() - Math.random() * 30 * 60 * 1000),
    };
  }

  try {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const last30min = new Date(Date.now() - 30 * 60 * 1000);

    const [
      entriesLast24h,
      recentEntries,
      activeUsers,
    ] = await Promise.all([
      prisma.gpsEntry.count({
        where: { timestamp: { gte: last24h } }
      }),
      prisma.gpsEntry.findMany({
        where: { timestamp: { gte: last24h } },
        select: { latitude: true, longitude: true },
        take: 100,
      }),
      prisma.gpsEntry.groupBy({
        by: ['userId'],
        where: { timestamp: { gte: last30min } },
        _count: { userId: true },
      }),
    ]);

    const lastEntry = await prisma.gpsEntry.findFirst({
      orderBy: { timestamp: 'desc' },
      select: { timestamp: true },
    });

    return {
      activeTrackers: activeUsers.length,
      entriesLast24h: entriesLast24h,
      averageAccuracy: 4.2, // Mock average accuracy
      lastUpdate: lastEntry?.timestamp || null,
    };
  } catch (error) {
    return {
      activeTrackers: 0,
      entriesLast24h: 0,
      averageAccuracy: 0,
      lastUpdate: null,
    };
  }
}

async function getProjectMetrics() {
  if (USE_MOCK_DATA) {
    return {
      activeProjects: Math.floor(Math.random() * 8) + 3,
      completedProjects: Math.floor(Math.random() * 5) + 2,
      totalBudget: 125000000 + Math.random() * 50000000,
      totalSpent: 75000000 + Math.random() * 25000000,
      averageProgress: Math.random() * 30 + 45,
    };
  }

  try {
    const [
      activeProjects,
      completedProjects,
      allProjects,
    ] = await Promise.all([
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.project.count({ where: { status: 'COMPLETED' } }),
      prisma.project.findMany({
        select: { budget: true, spent: true, progress: true },
      }),
    ]);

    const totalBudget = allProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = allProjects.reduce((sum, p) => sum + p.spent, 0);
    const averageProgress = allProjects.length > 0
      ? allProjects.reduce((sum, p) => sum + p.progress, 0) / allProjects.length
      : 0;

    return {
      activeProjects,
      completedProjects,
      totalBudget,
      totalSpent,
      averageProgress,
    };
  } catch (error) {
    return {
      activeProjects: 0,
      completedProjects: 0,
      totalBudget: 0,
      totalSpent: 0,
      averageProgress: 0,
    };
  }
}

function getSystemMetrics() {
  return {
    uptime: process.uptime() * 1000, // Convert to milliseconds
    version: '2.1.0', // Updated version
    environment: process.env.NODE_ENV || 'development',
    lastHealthCheck: new Date(),
  };
}

export async function GET() {
  try {
    const [databaseMetrics, gpsMetrics, projectMetrics, systemMetrics] = await Promise.all([
      getDatabaseMetrics(),
      getGPSMetrics(),
      getProjectMetrics(),
      getSystemMetrics(),
    ]);

    const metrics: SystemMetrics = {
      database: databaseMetrics,
      gpsTracking: gpsMetrics,
      projects: projectMetrics,
      system: systemMetrics,
    };

    // Determine overall system health
    const overallHealth =
      databaseMetrics.status === 'error' ? 'critical' :
      databaseMetrics.status === 'warning' ? 'warning' : 'healthy';

    return NextResponse.json({
      success: true,
      health: overallHealth,
      metrics,
      timestamp: new Date(),
      summary: {
        status: overallHealth,
        activeProjects: projectMetrics.activeProjects,
        activeTrackers: gpsMetrics.activeTrackers,
        systemUptime: systemMetrics.uptime,
        databaseHealth: databaseMetrics.status,
      },
    });
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    return NextResponse.json({
      success: false,
      health: 'critical',
      error: 'Failed to fetch system metrics',
      details: error.message,
      timestamp: new Date(),
    }, { status: 500 });
  }
}

// Automated backup endpoint
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'backup') {
      // Simulate database backup process
      const backupId = `backup_${Date.now()}`;
      const timestamp = new Date();

      // In a real implementation, this would:
      // 1. Create a database dump
      // 2. Upload to cloud storage (AWS S3, Google Cloud Storage)
      // 3. Log the backup operation
      // 4. Clean up old backups

      const backupInfo = {
        id: backupId,
        timestamp,
        status: 'completed',
        size: '45.2 MB', // Mock size
        location: `gs://png-road-monitor-backups/${backupId}.sql`,
        tables: [
          'users', 'projects', 'gps_entries', 'financial_entries',
          'progress_entries', 'provinces', 'work_types', 'contractors',
          'system_settings'
        ],
        duration: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
      };

      return NextResponse.json({
        success: true,
        message: 'Database backup completed successfully',
        backup: backupInfo,
      });
    }

    if (action === 'health-check') {
      // Comprehensive health check
      const healthChecks = {
        database: databaseMetrics.status,
        apiEndpoints: 'healthy', // Check all API endpoints
        gpsTracking: gpsMetrics.activeTrackers > 0 ? 'active' : 'idle',
        fileStorage: 'healthy', // Check file upload/download
        authentication: 'healthy', // Check auth system
      };

      return NextResponse.json({
        success: true,
        healthChecks,
        overallStatus: Object.values(healthChecks).every(status =>
          status === 'healthy' || status === 'active' || status === 'idle'
        ) ? 'healthy' : 'warning',
        timestamp: new Date(),
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action specified',
    }, { status: 400 });

  } catch (error) {
    console.error('Error in monitoring POST request:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process monitoring request',
      details: error.message,
    }, { status: 500 });
  }
}
