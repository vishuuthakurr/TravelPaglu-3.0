import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllDestinations, createDestination } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const maxBudget = searchParams.get('maxBudget') ? Number(searchParams.get('maxBudget')) : undefined;
    const tag = searchParams.get('tag') || undefined;

    const destinations = await getAllDestinations({ search, maxBudget, tag });
    return NextResponse.json(destinations);
  } catch (error: any) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
    }

    const body = await req.json();
    if (!body.name || !body.state || !body.heroImage) {
      return NextResponse.json({ error: 'Name, state, and hero image are required.' }, { status: 400 });
    }

    const newDest = await createDestination({
      ...body,
      publishedBy: (session.user as any)?.id,
    });

    return NextResponse.json(newDest, { status: 201 });
  } catch (error: any) {
    console.error('Error creating destination:', error);
    return NextResponse.json({ error: error.message || 'Failed to create destination' }, { status: 500 });
  }
}
