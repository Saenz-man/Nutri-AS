import { z } from "zod";

export const UpdateUserSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  apellido: z.string().min(2, "El apellido es muy corto"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  carrera: z.string().min(3, "Ingresa una carrera válida"),
  // Simplificamos la fecha para evitar errores de tipos con errorMap
  cumpleaños: z.coerce.date({
    invalid_type_error: "La fecha de nacimiento es requerida",
  }),
  fotoPerfil: z.string().url().optional().or(z.literal("")),
  fotoBanner: z.string().url().optional().or(z.literal("")),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;