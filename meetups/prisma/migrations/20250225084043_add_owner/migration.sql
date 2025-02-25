-- CreateTable
CREATE TABLE "Meetups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Meetups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupTags" (
    "id" SERIAL NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "MeetupTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Meetups" ADD CONSTRAINT "Meetups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupTags" ADD CONSTRAINT "MeetupTags_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
