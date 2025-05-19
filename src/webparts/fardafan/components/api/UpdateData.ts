import { getDigest } from "./GetDigest";

export async function updatePersonalInfo(
  currentItemId: number,
  formData: any,
  setState: (state: any) => void,
  onReload: () => void
) {
  const listName = "HRPersonalInfo";
  const webUrl = "http://sharepoint.fardafan.com";

  if (!formData.Title || !formData.Title.trim()) {
    setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  try {
    const digest = await getDigest();

    const resType = await fetch(
      `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
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
      `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${currentItemId})`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE",
        },
        body: JSON.stringify(itemBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message.value);
    }

    setState({ message: `آیتم (${formData.Title}) با موفقیت به‌روزرسانی شد.` });
    onReload();
  } catch (err) {
    setState({ message: `خطا: ${err.message}` });
  }
}
