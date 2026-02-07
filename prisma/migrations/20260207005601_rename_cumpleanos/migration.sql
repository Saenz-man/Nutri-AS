/*
  Warnings:

  - Added the required column `fechaNacimiento` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "sexo" TEXT,
ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "talla" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cumpleaños",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Medicion" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "peso" DOUBLE PRECISION,
    "talla" DOUBLE PRECISION,
    "tallaSentado" DOUBLE PRECISION,
    "envergadura" DOUBLE PRECISION,
    "triceps" DOUBLE PRECISION,
    "subescapular" DOUBLE PRECISION,
    "biceps" DOUBLE PRECISION,
    "crestaIliaca" DOUBLE PRECISION,
    "supraespinal" DOUBLE PRECISION,
    "abdominal" DOUBLE PRECISION,
    "muslo" DOUBLE PRECISION,
    "piernaPaniculo" DOUBLE PRECISION,
    "grasaEquipo" DOUBLE PRECISION,
    "agua" DOUBLE PRECISION,
    "grasaVisceral" DOUBLE PRECISION,
    "edadMetabolica" INTEGER,
    "masaOsea" DOUBLE PRECISION,
    "musculo" DOUBLE PRECISION,
    "imc" DOUBLE PRECISION,
    "icc" DOUBLE PRECISION,
    "cintura" DOUBLE PRECISION,
    "cadera" DOUBLE PRECISION,
    "brazoR" DOUBLE PRECISION,
    "brazoC" DOUBLE PRECISION,
    "piernaCirc" DOUBLE PRECISION,
    "estiloideo" DOUBLE PRECISION,
    "femur" DOUBLE PRECISION,
    "humero" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laboratorio" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "sodio" DOUBLE PRECISION,
    "potasio" DOUBLE PRECISION,
    "cloro" DOUBLE PRECISION,
    "bicarbonato" DOUBLE PRECISION,
    "coTotal" DOUBLE PRECISION,
    "acidoUrico" DOUBLE PRECISION,
    "glucosaAyuno" DOUBLE PRECISION,
    "glucosa1hr" DOUBLE PRECISION,
    "glucosa2hr" DOUBLE PRECISION,
    "hbGlucosilada" DOUBLE PRECISION,
    "creatinina" DOUBLE PRECISION,
    "urea" DOUBLE PRECISION,
    "albumina" DOUBLE PRECISION,
    "calcioTotal" DOUBLE PRECISION,
    "fosforo" DOUBLE PRECISION,
    "colesterolTotal" DOUBLE PRECISION,
    "hdl" DOUBLE PRECISION,
    "ldl" DOUBLE PRECISION,
    "vldl" DOUBLE PRECISION,
    "trigliceridos" DOUBLE PRECISION,
    "lipidosTotales" DOUBLE PRECISION,
    "indiceAterogenico" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "proteinas" TEXT DEFAULT 'Negativo',
    "glucosaOrina" TEXT DEFAULT 'Negativo',
    "cetona" TEXT DEFAULT 'Negativo',
    "sangre" TEXT DEFAULT 'Negativo',
    "bilirrubina" TEXT DEFAULT 'Negativo',
    "nitritos" TEXT DEFAULT 'Negativo',
    "sedimento" TEXT DEFAULT 'Negativo',
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Laboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R24" (
    "id" TEXT NOT NULL,
    "consumoKcal" DOUBLE PRECISION NOT NULL,
    "notas" TEXT,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "R24_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanAlimenticio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "detalles" TEXT,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "PlanAlimenticio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicion_appointmentId_key" ON "Medicion"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratorio_appointmentId_key" ON "Laboratorio"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "R24_appointmentId_key" ON "R24"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanAlimenticio_appointmentId_key" ON "PlanAlimenticio"("appointmentId");

-- AddForeignKey
ALTER TABLE "Medicion" ADD CONSTRAINT "Medicion_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratorio" ADD CONSTRAINT "Laboratorio_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "R24" ADD CONSTRAINT "R24_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAlimenticio" ADD CONSTRAINT "PlanAlimenticio_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
