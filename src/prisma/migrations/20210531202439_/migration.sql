-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageView.name_unique" ON "PageView"("name");
