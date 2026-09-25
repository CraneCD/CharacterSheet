-- AlterTable
ALTER TABLE "CampaignSession" ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "CampaignItem" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "rarity" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "value" TEXT NOT NULL DEFAULT '',
    "revealed" BOOLEAN NOT NULL DEFAULT false,
    "heldBy" TEXT,
    "dmNotes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CampaignItem_campaignId_idx" ON "CampaignItem"("campaignId");

-- AddForeignKey
ALTER TABLE "CampaignItem" ADD CONSTRAINT "CampaignItem_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Like every other table on the production (Supabase) database: RLS on, so
-- Supabase's public API can't read loot. The app's own role owns the table,
-- so it isn't affected.
ALTER TABLE "CampaignItem" ENABLE ROW LEVEL SECURITY;
