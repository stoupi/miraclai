-- CreateTable
CREATE TABLE "SentInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SentInvitation_email_idx" ON "SentInvitation"("email");
