-- DropIndex
DROP INDEX "user_auth_verifications_authentication_id_idx";

-- AlterTable
ALTER TABLE "user_authentications" ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "user_auth_verifications_authentication_id_code_idx" ON "user_auth_verifications"("authentication_id", "code");
