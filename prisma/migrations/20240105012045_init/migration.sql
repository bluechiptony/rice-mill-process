-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMINISTRATOR', 'USER');

-- CreateEnum
CREATE TYPE "AUTH_ACTION" AS ENUM ('LOGIN', 'ACCOUNT_VERIFICATION');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email_address" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_authentications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "has_2fa" BOOLEAN NOT NULL DEFAULT false,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_authentications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auth_verifications" (
    "id" UUID NOT NULL,
    "authentication_id" UUID NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "expiry" TIMESTAMPTZ NOT NULL,
    "action" "AUTH_ACTION" NOT NULL DEFAULT 'LOGIN',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_auth_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_address_key" ON "users"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "users_email_address_phone_number_idx" ON "users"("email_address", "phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentications_user_id_key" ON "user_authentications"("user_id");

-- CreateIndex
CREATE INDEX "user_authentications_user_id_idx" ON "user_authentications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_verifications_authentication_id_key" ON "user_auth_verifications"("authentication_id");

-- CreateIndex
CREATE INDEX "user_auth_verifications_authentication_id_idx" ON "user_auth_verifications"("authentication_id");

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_auth_verifications" ADD CONSTRAINT "user_auth_verifications_authentication_id_fkey" FOREIGN KEY ("authentication_id") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
