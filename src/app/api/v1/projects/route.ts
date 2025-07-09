import { NextResponse } from 'next/server';
import { MockAPIService } from '@/lib/mockApiService';
import { prisma } from '@/lib/prisma';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export async function GET() {
  try {
    if (USE_MOCK_DATA) {
      // Pure mock data response - no database dependencies
      const result = await MockAPIService.getProjects();
      return NextResponse.json(result);
    }

    // Use real PostgreSQL database
    const projects = await prisma.project.findMany({
      include: {
        province: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        _count: {
          select: {
            gpsEntries: true,
            financialEntries: true,
            progressEntries: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch projects',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.location || !body.provinceId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, location, provinceId'
      }, { status: 400 });
    }

    if (USE_MOCK_DATA) {
      // Pure mock data response - no database dependencies
      const result = await MockAPIService.createProject(body);
      return NextResponse.json(result, { status: result.success ? 201 : 400 });
    }

    // Use real PostgreSQL database
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description || null,
        location: body.location,
        provinceId: body.provinceId,
        status: body.status || 'PLANNING',
        budget: body.budget || 0,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        contractor: body.contractor || null,
        managerId: body.managerId || null,
        fundingSource: body.fundingSource || 'GOVERNMENT',
      },
      include: {
        province: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create project',
      details: error.message
    }, { status: 500 });
  }
}
