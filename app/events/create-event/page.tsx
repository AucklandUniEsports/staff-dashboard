import prisma from '@/lib/prisma';
import CreateEventClient from './CreateEventClient';

export default async function CreateEvent() {
  const locations = await prisma.location.findMany();
  const categories = await prisma.category.findMany();
  return (
    <CreateEventClient locations={locations} categories={categories}/>
  );
}
