import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getDestinationBySlug, getAllDestinations } from '@/lib/storage';
import { Destination } from '@/types';
import DestinationClientView from './DestinationClientView';

export const revalidate = 0; // Dynamic data

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />
      <DestinationClientView destination={destination} />
    </div>
  );
}
