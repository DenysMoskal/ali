'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Email must be a valid email address.' }),
  assignment_description: z.string().min(10, {
    message: 'Assignment description must be at least 10 characters.',
  }),
  github_repo_url: z
    .string()
    .url({ message: 'GitHub repository URL must be a valid URL.' }),
  candidate_level: z
    .string()
    .min(1, { message: 'Candidate level is required.' }),
});

export async function submitAssignmentAction(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    assignment_description: formData.get('assignment_description'),
    github_repo_url: formData.get('github_repo_url'),
    candidate_level: formData.get('candidate_level'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://tools.qa.ale.ai/api/tools/candidates';

    const response = await fetch(`${API_URL}/assignments`, {
      method: 'POST',
      body: JSON.stringify(validatedFields.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        error: errorData?.message || 'Failed to submit assignment',
      };
    }

    return { success: true, data: validatedFields.data };
  } catch (error) {
    console.error('Submit assignment error:', error);
    return { error: 'Failed to submit assignment' };
  }
}
