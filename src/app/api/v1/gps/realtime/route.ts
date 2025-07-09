import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Store active tracking sessions
const activeSessions = new Map();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');
    const timeframe = searchParams.get('timeframe') || '1'; // hours

    if (USE_MOCK_DATA) {
      // Return mock real-time data
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: `gps-${i}`,
        latitude: -6.314993 + (Math.random() - 0.5) * 0.01,
        longitude: 143.95555 + (Math.random() - 0.5) * 0.01,
        accuracy: Math.random() * 10 + 3,
        timestamp: new Date(Date.now() - i * 5 * 60 * 1000),
        userId: 'user-1',
        projectId: 'project-1',
        taskName: 'Site Inspection',
        workType: 'Survey and Design',
        isActive: Math.random() > 0.3,
      }));

      return NextResponse.json({
        success: true,
        data: mockData,
        activeTrackers: Math.floor(Math.random() * 15) + 5,
        lastUpdate: new Date(),
      });
    }

    // Real database query
    const hoursAgo = new Date(Date.now() - Number.parseInt(timeframe) * 60 * 60 * 1000);

    const whereClause: any = {
      timestamp: {
        gte: hoursAgo,
      },
    };

    if (projectId && projectId !== 'all') {
      whereClause.projectId = projectId;
    }

    if (userId && userId !== 'all') {
      whereClause.userId = userId;
    }

    const gpsEntries = await prisma.gpsEntry.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 1000, // Limit to prevent huge responses
    });

    // Calculate real-time metrics
    const activeTrackers = await prisma.gpsEntry.groupBy({
      by: ['userId'],
      where: {
        timestamp: {
          gte: new Date(Date.now() - 30 * 60 * 1000), // Last 30 minutes
        },
      },
      _count: {
        userId: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: gpsEntries,
      activeTrackers: activeTrackers.length,
      totalEntries: gpsEntries.length,
      timeframe: Number.parseInt(timeframe),
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error('Error fetching real-time GPS data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch real-time GPS data',
      details: error.message,
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, sessionId, userId, projectId, position } = body;

    if (action === 'start-session') {
      // Start a new tracking session
      activeSessions.set(sessionId, {
        userId,
        projectId,
        startTime: new Date(),
        lastUpdate: new Date(),
        positions: [],
      });

      return NextResponse.json({
        success: true,
        message: 'Tracking session started',
        sessionId,
      });
    }

    if (action === 'update-position') {
      // Update position in session
      const session = activeSessions.get(sessionId);
      if (session) {
        session.positions.push(position);
        session.lastUpdate = new Date();

        // Save to database if using real data
        if (!USE_MOCK_DATA && prisma) {
          await prisma.gpsEntry.create({
            data: {
              latitude: position.latitude,
              longitude: position.longitude,
              description: position.description || 'Real-time tracking update',
              projectId: session.projectId,
              userId: session.userId,
              taskName: position.taskName || 'Real-time Tracking',
              workType: position.workType || 'Field Work',
              timestamp: new Date(),
            },
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Position updated',
        sessionStats: session ? {
          duration: Date.now() - session.startTime.getTime(),
          positionCount: session.positions.length,
        } : null,
      });
    }

    if (action === 'end-session') {
      // End tracking session
      const session = activeSessions.get(sessionId);
      if (session) {
        activeSessions.delete(sessionId);

        return NextResponse.json({
          success: true,
          message: 'Tracking session ended',
          sessionSummary: {
            duration: Date.now() - session.startTime.getTime(),
            totalPositions: session.positions.length,
            startTime: session.startTime,
            endTime: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action or session not found',
    }, { status: 400 });

  } catch (error) {
    console.error('Error handling real-time GPS request:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process real-time GPS request',
      details: error.message,
    }, { status: 500 });
  }
}
