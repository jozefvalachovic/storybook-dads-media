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
  let setSubmit: (submit: boolean) => void = () => {};
  // Handler
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Update form submission state
    updateFormDataSubmit(event, true);
    // Provide setSubmit function to handler to reset form submission state (if needed)
    setSubmit = updateFormDataSubmit.bind(null, event);

    // Handle form submission
    const params = { event, setSubmit };
    await handler(params);

    // Reset form submission state
    if (options.refresh) {
      router.refresh();
    }
    if (options.resetSubmit) {
      setSubmit(false);
    }
  }

  return { handleSubmit, setSubmit };
}

function updateFormDataSubmit(event: FormEvent<HTMLFormElement>, dataSubmit: boolean) {
  const form = event.currentTarget;

  if (form) {
    form.setAttribute("data-submit", `${dataSubmit}`);
  }
}
