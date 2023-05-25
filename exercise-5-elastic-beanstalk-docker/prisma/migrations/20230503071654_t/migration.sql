-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);
