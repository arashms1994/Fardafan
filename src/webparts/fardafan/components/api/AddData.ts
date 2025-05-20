import { getDigest } from "./GetDigest";

export async function addPersonalInfo(
  formData: any,
  setState: (state: any) => void,
  onReload: () => void,
  GUID0: any
) {
  const listGuid = "56924213-A595-48FA-A0C1-E18F03AC7646";
  const webUrl = "http://sharepoint.fardafan.com/HR";

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

    const itemBody: any = {
      __metadata: { type: itemType },
    };

    if (GUID0) {
      itemBody["GUID0"] = GUID0;
    }

    console.log("Sending itemBody:", JSON.stringify(itemBody, null, 2));
    console.log("Item Type:", itemType);

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
      console.error("SharePoint Error:", errorData);
      throw new Error(errorData.error.message.value);
    }

    setState({ message: `آیتم جدید (${formData.Title}) اضافه شد.`, Title: "" });
    onReload();
  } catch (err) {
    setState({ message: `خطا: ${(err as any).message}` });
  }
}
