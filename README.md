# PNG Road Construction Monitor

A comprehensive road infrastructure monitoring system designed for the **Papua New Guinea Department of Works**. This production-ready application provides real-time monitoring of road construction projects across all 22 PNG provinces.

## 🚀 Live Demo

**Production URL**: [https://pngroadsystems.vercel.app](https://pngroadsystems.vercel.app)

## 📋 Test Credentials

### System Administrator
- **Email**: `admin@png.gov.pg`
- **Password**: `admin123`
- **Role**: Full system access

### Project Manager
- **Email**: `michael.kila@works.png.gov.pg`
- **Password**: `admin123`
- **Role**: Project oversight and management

### Site Engineer
- **Email**: `james.peter@works.png.gov.pg`
- **Password**: `admin123`
- **Role**: Field operations and reporting

### Quality Inspector
- **Email**: `mary.thomas@works.png.gov.pg`
- **Password**: `admin123`
- **Role**: Quality assurance and inspections

## 🏗️ System Features

### Core Modules
- **📊 Dashboard**: Real-time project overview and KPIs
- **🛣️ Project Management**: Complete project lifecycle tracking
- **📍 GPS Tracking**: Real-time field worker location monitoring
- **💰 Financial Tracking**: Budget monitoring and cost analysis
- **🏢 Contractor Management**: Vendor registration and performance tracking
- **⚠️ HSE Reports**: Health, Safety & Environment incident reporting
- **📱 Mobile-First Design**: Optimized for field workers on mobile devices

### Dashboard Components
1. **Project Overview**: Summary cards with key metrics
2. **Budget Analysis**: Financial tracking and cost breakdowns
3. **Progress Mapping**: Geographic visualization of projects
4. **Recent Activities**: Timeline of project updates
5. **Performance Metrics**: KPI tracking and analytics
6. **Equipment Status**: Machinery and resource monitoring
7. **Weather Integration**: Climate data for project planning
8. **Resource Allocation**: Personnel and equipment distribution
9. **Safety Metrics**: HSE compliance and incident tracking
10. **Reporting Tools**: Automated report generation

## 🗺️ PNG Coverage

The system includes comprehensive data for all **22 PNG Provinces**:

**Highlands Region**: Hela, Southern Highlands, Enga, Western Highlands, Jiwaka, Simbu

**Momase Region**: East Sepik, Sandaun, Morobe, Madang

**New Guinea Islands**: East New Britain, West New Britain, New Ireland, Manus, Bougainville

**Papua Region**: Central, Gulf, Milne Bay, Oro, National Capital District, Western

**Sample Projects**: 5 comprehensive road construction projects with realistic PNG data

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL (Neon Cloud Database)
- **Authentication**: JWT-based session management
- **UI Framework**: React with shadcn/ui components
- **Styling**: Tailwind CSS
- **ORM**: Prisma
- **Package Manager**: Bun
- **Deployment**: Vercel
- **Maps**: Google Maps API integration
- **Analytics**: Vercel Analytics & Speed Insights

## 🚀 Quick Start for Vercel Deployment

### 1. Deploy to Vercel

The repository is already configured for Vercel deployment:

```bash
# Option 1: Deploy via Vercel CLI
npx vercel --prod

# Option 2: Connect repository in Vercel Dashboard
# Visit: https://vercel.com/new
# Import: https://github.com/tpdc055/pngroadsystems
```

### 2. Environment Variables

Copy these environment variables to your Vercel project settings:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_oiDghtu0HEP9@ep-bitter-block-a7asb7u9-pooler.ap-southeast-2.aws.neon.tech/connectpng_local?sslmode=require"

# Authentication
JWT_SECRET="PNG-RoadMonitor-JWT-Secret-2024-Department-Works-Infrastructure-Division"
SESSION_SECRET="PNG-Session-Secret-2024-Infrastructure-Division-Monitoring-System"

# Application Configuration
NEXT_PUBLIC_APP_URL="https://pngroadsystems.vercel.app"
NEXT_PUBLIC_SYSTEM_NAME="PNG Road Construction Monitor"
NEXT_PUBLIC_ORGANIZATION_NAME="Papua New Guinea Department of Works"
NEXT_PUBLIC_USE_MOCK_DATA="false"

# Google Maps (for GPS features)
GOOGLE_MAPS_API_KEY="AIzaSyDxJvxw-6kkUwib2KsWF2RqIkeF42KIIRs"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyDxJvxw-6kkUwib2KsWF2RqIkeF42KIIRs"

# Production Settings
NODE_ENV="production"
SKIP_ENV_VALIDATION="false"
SKIP_TYPE_CHECK="false"
```

### 3. Vercel Configuration

The project includes optimized `vercel.json`:
- **Build Command**: `bun install && bunx prisma generate && bun run build`
- **Framework**: Next.js
- **Region**: Sydney (syd1) for PNG proximity
- **API Timeout**: 10 seconds for database operations

## 🏃‍♂️ Local Development

```bash
# Clone the repository
git clone https://github.com/tpdc055/pngroadsystems.git
cd pngroadsystems

# Install dependencies
bun install

# Set up database
bunx prisma generate
bunx prisma db push
bun run db:seed

# Start development server
bun dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The system uses a comprehensive PostgreSQL schema:

### Core Tables
- **Users**: System users with role-based access
- **Projects**: Road construction project details
- **Provinces**: All 22 PNG provinces
- **Contractors**: Vendor management
- **Activities**: Project timeline and updates
- **FinancialRecords**: Budget and expense tracking
- **HSEReports**: Health, Safety & Environment incidents
- **GPSLocations**: Real-time field worker tracking

### Sample Data Included
- **22 PNG Provinces**: Complete geographical coverage
- **5 Sample Projects**: Realistic road construction scenarios
- **Multiple User Roles**: Admin, Manager, Engineer, Inspector
- **Work Types**: Road construction, bridge building, maintenance
- **Financial Records**: Budget allocations and expense tracking

## 🔐 Security Features

- **JWT Authentication**: Secure session management
- **Role-Based Access Control**: User permissions by role
- **Environment Variables**: Secure configuration management
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Prisma ORM security
- **CORS Configuration**: Proper cross-origin setup

## 📱 Mobile Optimization

- **Responsive Design**: Works on all device sizes
- **Touch-Friendly Interface**: Optimized for mobile field workers
- **Offline Capabilities**: Core features work without internet
- **GPS Integration**: Real-time location tracking
- **Camera Integration**: Photo capture for reports

## 🌏 PNG-Specific Features

- **Provincial Coverage**: All 22 PNG provinces included
- **Local Currency**: PNG Kina (PGK) support
- **Cultural Considerations**: PNG-appropriate UI/UX
- **Government Branding**: Department of Works styling
- **Regional Weather**: Climate data integration
- **Local Time Zone**: PNG Standard Time (UTC+10)

## 📈 Performance Monitoring

- **Vercel Analytics**: Traffic and performance metrics
- **Speed Insights**: Core web vitals tracking
- **Database Monitoring**: Query performance optimization
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: Usage patterns and adoption metrics

## 🔧 Build Configuration

The project uses optimized build settings:
- **Framework**: Next.js 15 with App Router
- **Package Manager**: Bun for faster installs
- **Type Checking**: Full TypeScript validation
- **Code Quality**: Biome for linting and formatting
- **Database**: Prisma with PostgreSQL
- **Deployment**: Vercel with Sydney region

## 📞 Support & Documentation

- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`
- **Field Worker Manual**: `FIELD_WORKER_GUIDE.md`
- **Government Integration**: `PNG_GOVERNMENT_INTEGRATION.md`
- **System Support**: Contact PNG Department of Works

## 🚀 Ready for Production

This system is **production-ready** with:
- ✅ Comprehensive database schema and seed data
- ✅ All 10 dashboard modules implemented
- ✅ Mobile-optimized interface
- ✅ Role-based authentication system
- ✅ Real-time GPS tracking
- ✅ Financial and project management tools
- ✅ HSE reporting and compliance
- ✅ Vercel deployment configuration
- ✅ PostgreSQL database with Neon hosting
- ✅ Complete PNG provincial coverage

**Deploy URL**: `https://github.com/tpdc055/pngroadsystems`
