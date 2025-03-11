/*
  Warnings:

  - A unique constraint covering the columns `[meetupId,tag]` on the table `MeetupTags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MeetupTags_meetupId_tag_key" ON "MeetupTags"("meetupId", "tag");
