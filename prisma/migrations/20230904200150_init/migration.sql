-- CreateTable
CREATE TABLE "User" (
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "password" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
