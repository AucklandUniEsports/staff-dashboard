import prisma from '@/lib/prisma';
import CreateEventClient from './CreateEventClient';

export default async function CreateEvent() {
  const categories = await prisma.category.findMany();
  return (
    <CreateEventClient categories={categories}/>
  );
}
