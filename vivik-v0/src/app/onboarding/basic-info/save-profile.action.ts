"use server"

// NOTE: If '@/utils/supabase/client' import fails, use relative path '../../utils/supabase/client'
// NOTE: If 'next-safe-action' is not installed, run: npm install next-safe-action
import { createClient } from '../../../../utils/supabase/client'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

// Initialize a safe action client
const actionClient = createSafeActionClient()

// Define input validation schema
const profileSchema = z.object({
  userId: z.string().min(1, 'Missing user ID'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  birthDate: z.date(),
  // Gender must be one of 'MALE', 'FEMALE', 'OTHER' (uppercase, as per Prisma enum)
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'])
})

// Create server action for saving profile data
export const saveProfile = actionClient.action(profileSchema, async ({ parsedInput: { userId, fullName, birthDate, gender } }) => {
    const supabase = createClient()
    // Check if profile already exists
    const { data: existing, error: fetchError } = await supabase
      .from('Profile')
      .select('id')
      .eq('userId', userId)
      .single()
    if (fetchError && fetchError.code !== 'PGRST116') {
      return { success: false, error: 'Failed to check existing profile.' }
    }
    if (existing) {
      return { success: false, error: 'Profile already exists.' }
    }
    // Insert new profile
    const { error } = await supabase.from('Profile').insert([
      { userId, fullName, birthDate, gender }
    ])
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  }) 