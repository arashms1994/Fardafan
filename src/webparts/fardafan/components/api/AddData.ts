import { getDigest } from "./GetDigest";

export async function addPersonalInfo(
  formData: any,
  setState: (state: any) => void,
  onReload: () => void
) {
  const listGuid = "7B569242-13A5-9548-FAA0-C1E18F03AC7646";
  const webUrl = "http://sharepoint.fardafan.com";

  if (!formData.Title || !formData.Title.trim()) {
    setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  try {
    const digest = await getDigest();

    const resType = await fetch(
      `${webUrl}/_api/web/lists(guid'${listGuid}')?$select=ListItemEntityTypeFullName`,
      {
        headers: { Accept: "application/json;odata=verbose" },
      }
    );
    const dataType = await resType.json();
    const itemType = dataType.d.ListItemEntityTypeFullName;

    const itemBody = {
      __metadata: { type: itemType },
      ...formData,
    };

    const response = await fetch(
      `${webUrl}/_api/web/lists(guid'${listGuid}')/items`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
        },
        body: JSON.stringify(itemBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message.value);
    }

    setState({ message: `آیتم جدید (${formData.Title}) اضافه شد.`, Title: "" });
    onReload();
  } catch (err) {
    setState({ message: `خطا: ${(err as any).message}` });
  }
}
