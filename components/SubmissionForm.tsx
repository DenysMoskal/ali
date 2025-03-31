'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCandidateLevels } from '@/services/api';
import { submitAssignmentAction } from '@/app/actions';
import { z } from 'zod';
import { FormButton } from './UI/FormButton';
import FormInput from './UI/FormInput';
import FormTextArea from './UI/FormTextArea';
import FormSelect from './UI/FormSelect';

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

type FormData = z.infer<typeof formSchema>;

export default function SubmissionForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    assignment_description: '',
    github_repo_url: '',
    candidate_level: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [candidateLevels, setCandidateLevels] = useState<string[]>([]);
  const [isLoadingLevels, setIsLoadingLevels] = useState(true);
  const [levelsError, setLevelsError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidateLevels = async () => {
      try {
        const levels = await fetchCandidateLevels();
        setCandidateLevels(levels);
        setLevelsError(null);
      } catch (error) {
        setLevelsError(
          'Failed to load candidate levels. Please try again later.'
        );
        console.error('Error fetching candidate levels:', error);
      } finally {
        setIsLoadingLevels(false);
      }
    };

    loadCandidateLevels();
  }, []);

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const result = await submitAssignmentAction(formDataObj);

      if (result.error) {
        if (typeof result.error === 'object') {
          setErrors(result.error);
        } else {
          setApiError(result.error);
        }
        return;
      }

      router.push(
        `/thank-you?name=${encodeURIComponent(
          formData.name
        )}&email=${encodeURIComponent(
          formData.email
        )}&candidateLevel=${encodeURIComponent(formData.candidate_level)}`
      );
    } catch {
      setApiError('Failed to submit the assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Assignment Submission Form</h2>

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="submission-name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormInput
          id="submission-email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormTextArea
          id="submission-description"
          name="assignment_description"
          label="Assignment Description"
          value={formData.assignment_description}
          onChange={handleChange}
          error={errors.assignment_description}
          required
        />

        <FormInput
          id="submission-github"
          name="github_repo_url"
          label="GitHub Repository URL"
          type="url"
          value={formData.github_repo_url}
          onChange={handleChange}
          error={errors.github_repo_url}
          required
        />

        <FormSelect
          id="submission-level"
          name="candidate_level"
          label="Candidate Level"
          value={formData.candidate_level}
          options={candidateLevels}
          onChange={handleChange}
          error={errors.candidate_level}
          required
          isLoading={isLoadingLevels}
          loadingError={levelsError}
        />

        <FormButton
          isSubmitting={isSubmitting}
          isDisabled={isLoadingLevels}
          text="Submit Assignment"
        />
      </form>
    </div>
  );
}
