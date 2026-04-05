-- DropForeignKey
ALTER TABLE "CategoriesOnEvents" DROP CONSTRAINT "CategoriesOnEvents_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnEvents" DROP CONSTRAINT "CategoriesOnEvents_eventId_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnEvents" ADD CONSTRAINT "CategoriesOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnEvents" ADD CONSTRAINT "CategoriesOnEvents_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
