import { z } from "zod"

export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required").max(100, "Group name must be less than 100 characters"),
})

export type CreateGroupFormData = z.infer<typeof createGroupSchema>
