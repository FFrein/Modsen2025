-- CreateTable
CREATE TABLE "UserRecords" (
    "id" SERIAL NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRecords_meetupId_userId_key" ON "UserRecords"("meetupId", "userId");

-- AddForeignKey
ALTER TABLE "UserRecords" ADD CONSTRAINT "UserRecords_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecords" ADD CONSTRAINT "UserRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
