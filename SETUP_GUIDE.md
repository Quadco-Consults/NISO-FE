# NISO ERP Setup Guide

## Installation & Running the Application

### Option 1: Standard Development Server

```bash
# Navigate to project directory
cd niso-erp

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

The application will start at **http://localhost:3000**

### Option 2: If you encounter "Bus error" issues

This can happen due to memory constraints. Try these solutions:

**A. Increase Node.js memory:**
```bash
NODE_OPTIONS='--max-old-space-size=8192' npm run dev
```

**B. Clear cache and reinstall:**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

**C. Use a different terminal or restart your system**

**D. Try production build:**
```bash
npm run build
npm start
```

### Option 3: Docker (Recommended for Production)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Run:
```bash
docker build -t niso-erp .
docker run -p 3000:3000 niso-erp
```

## Default Login Credentials

- **Email**: admin@niso.ng
- **Password**: password

## Accessing the Application

Once the server is running, navigate to:
- **Login Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard (after login)

## Available Routes

- `/` - Login page
- `/dashboard` - Main dashboard with grid operations
- `/customers` - Customer management (DisCos, GenCos, IPPs, Traders)
- `/billing` - Invoice management
- `/payments` - Payment processing
- `/collections` - Debt management
- `/settlement` - Settlement & reconciliation
- `/finance` - Financial reporting

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors
```bash
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Type errors
```bash
# Check TypeScript errors
npx tsc --noEmit
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npx tsc --noEmit
```

## Project Structure Overview

```
niso-erp/
├── app/                    # Next.js pages (App Router)
│   ├── (dashboard)/       # Dashboard module
│   ├── (billing)/         # Billing & invoicing
│   ├── (customers)/       # Customer management
│   ├── (payments)/        # Payment processing
│   ├── (collections)/     # Debt management
│   ├── (settlement)/      # Settlements
│   ├── (finance)/         # Financial reports
│   └── page.tsx           # Login page
├── components/            # React components
│   ├── layouts/          # App layouts
│   ├── features/         # Feature components
│   └── ui/               # UI components
├── lib/                  # Utilities & state
├── server/               # Server-side code
└── types/                # TypeScript types
```

## Features Checklist

✅ User authentication (demo mode)
✅ Role-based access control
✅ Dashboard with real-time metrics
✅ Customer management (CRUD)
✅ Invoice generation & tracking
✅ Payment processing & allocation
✅ Debt aging & collections
✅ Settlement reconciliation
✅ Financial reporting
✅ Responsive design (mobile/tablet/desktop)
✅ Type-safe with TypeScript
✅ Modern UI with shadcn/ui

## Next Steps

1. **Backend Integration**: Connect to real database and API
2. **Authentication**: Implement NextAuth.js or similar
3. **Real-time Data**: Add WebSocket for grid operations
4. **Payment Gateways**: Integrate Paystack/Flutterwave
5. **Reporting**: Add chart visualizations with Recharts
6. **Testing**: Add unit and integration tests
7. **Deployment**: Deploy to Vercel, AWS, or Azure

## Support

For issues or questions:
- Check logs in terminal
- Review browser console for errors
- Verify all dependencies are installed
- Ensure Node.js version >= 18

## Environment Variables

Create `.env.local`:
```env
# Add your configuration here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Refer to `.env.example` for all available variables.
