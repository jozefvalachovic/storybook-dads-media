import { useRouter } from "next/navigation";
// Types
import type { FormEvent } from "react";
type Handler = (params: {
  event: FormEvent<HTMLFormElement>;
  setSubmit: (submit: boolean) => void;
}) => Promise<void>;
type Options = {
  refresh?: boolean;
  resetSubmit?: boolean;
};

export function useFormHandler(
  handler: Handler,
  options: Options = {
    refresh: false,
    resetSubmit: true,
  }
) {
  const router = useRouter();
  let formElement: HTMLFormElement | null = null;

  const setSubmit = (submit: boolean) => {
    if (formElement) {
      formElement.setAttribute("data-submit", String(submit));
    }
  };

  let error: Error | null = null;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Store reference to form element
    formElement = event.currentTarget;

    // Set form to submitting state
    setSubmit(true);

    try {
      await handler({ event, setSubmit });

      // Refresh router if needed
      if (options.refresh) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);

      error = error;
    } finally {
      // Reset submit state if needed even if there's an error
      if (options.resetSubmit) {
        setSubmit(false);
      }
    }
  }

  return { handleSubmit, setSubmit, error };
}
