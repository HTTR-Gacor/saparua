-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Anonymous',
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToQuote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToQuote_AB_unique" ON "_CategoryToQuote"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToQuote_B_index" ON "_CategoryToQuote"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToQuote" ADD CONSTRAINT "_CategoryToQuote_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToQuote" ADD CONSTRAINT "_CategoryToQuote_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
