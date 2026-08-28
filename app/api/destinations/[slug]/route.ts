import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDestinationBySlug, getDestinationById, updateDestination, deleteDestination } from '@/lib/storage';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    let destination = await getDestinationBySlug(slug);

    if (!destination) {
      destination = await getDestinationById(slug);
    }

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error: any) {
    console.error('Error fetching destination:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch destination' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
    }

    const { slug } = params;
    const body = await req.json();

    let target = await getDestinationBySlug(slug);
    if (!target) {
      target = await getDestinationById(slug);
    }

    if (!target) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    const id = target._id || target.id || slug;
    const updated = await updateDestination(id, body);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating destination:', error);
    return NextResponse.json({ error: error.message || 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
    }

    const { slug } = params;
    let target = await getDestinationBySlug(slug);
    if (!target) {
      target = await getDestinationById(slug);
    }

    if (!target) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    const id = target._id || target.id || slug;
    const success = await deleteDestination(id);

    return NextResponse.json({ success, message: 'Destination deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting destination:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete destination' }, { status: 500 });
  }
}
