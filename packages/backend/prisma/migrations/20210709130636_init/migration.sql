-- CreateTable
CREATE TABLE "TodoItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id")
);
