const WEB3FORMS_ACCESS_KEY = "215c67fa-9456-4b7c-861f-c2dc3f97a11b";

type Web3FormsField = string | number | boolean | null | undefined;
type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export const submitToWeb3Forms = async (
  subject: string,
  fields: Record<string, Web3FormsField>,
) => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      ...fields,
    }),
  });

  const result = await response.json() as Web3FormsResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || `Web3Forms request failed with status ${response.status}.`);
  }
};
