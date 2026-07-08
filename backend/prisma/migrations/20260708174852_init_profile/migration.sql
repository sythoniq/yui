-- CreateTable
CREATE TABLE "Profile" (
    "image_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
