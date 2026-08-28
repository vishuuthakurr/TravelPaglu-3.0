import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { toggleUserWishlist, findUserByEmail, getAllDestinations } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ savedDestinations: [] });
    }

    const user = await findUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ savedDestinations: [] });
    }

    // Get all destinations to populate wishlist cards
    const allDestinations = await getAllDestinations();
    const savedIds = user.savedDestinations || [];
    const populated = allDestinations.filter(
      (d) => savedIds.includes(d._id || '') || savedIds.includes(d.id || '') || savedIds.includes(d.slug)
    );

    return NextResponse.json({ savedIds, destinations: populated });
  } catch (error: any) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Please log in to save destinations.' }, { status: 401 });
    }

    const { destinationId } = await req.json();
    if (!destinationId) {
      return NextResponse.json({ error: 'destinationId is required.' }, { status: 400 });
    }

    const updatedList = await toggleUserWishlist(session.user.email, destinationId);
    return NextResponse.json({ success: true, savedDestinations: updatedList });
  } catch (error: any) {
    console.error('Error updating wishlist:', error);
    return NextResponse.json({ error: error.message || 'Failed to update wishlist' }, { status: 500 });
  }
}
