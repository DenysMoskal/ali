import LoadingSpinner from './LoadingSpinner';

type FormButtonProps = {
  isSubmitting: boolean;
  isDisabled?: boolean;
  text: string;
  loadingText?: string;
};

export function FormButton({
  isSubmitting,
  isDisabled = false,
  text,
  loadingText = 'Submitting...',
}: FormButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isDisabled}
      className={`w-full py-2.5 px-5 rounded-lg cursor-pointer text-white font-medium transition-all duration-200 shadow-sm
        ${
          isSubmitting || isDisabled
            ? 'bg-blue-400 cursor-not-allowed opacity-80'
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98]'
        }`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner />
          {loadingText}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
