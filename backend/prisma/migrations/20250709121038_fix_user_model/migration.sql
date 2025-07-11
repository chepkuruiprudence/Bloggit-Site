-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_Name" TEXT NOT NULL,
    "second_Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "passWord" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "last_update" TIMESTAMP(3) NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");
