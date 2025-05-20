export async function loadPersonalInfo(): Promise<any[]> {
  const listGuid = "56924213-a595-48fa-a0c1-e18f03ac7646";
  const webUrl = "http://sharepoint.fardafan.com/HR";

  try {
    const response = await fetch(
      `${webUrl}/_api/web/lists(guid'${listGuid}')?$select=ListItemEntityTypeFullName`,
      {
        headers: { Accept: "application/json;odata=verbose" },
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت داده‌ها: ${response.statusText}`);
    }

    const data = await response.json();
    return data.d.results;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function loadFamilyInfo(): Promise<any[]> {
  const webUrl = "http://sharepoint.fardafan.com";
  const listName = "HRFamilyInfo";

  try {
    const response = await fetch(
      `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      {
        headers: { Accept: "application/json;odata=verbose" },
      }
    );

    const data = await response.json();
    return data.d.results;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function loadProfessionInfo(): Promise<any[]> {
  const webUrl = "http://sharepoint.fardafan.com";
  const listName = "HRProfessionInfo";

  try {
    const response = await fetch(
      `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      {
        headers: { Accept: "application/json;odata=verbose" },
      }
    );

    const data = await response.json();
    return data.d.results;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}

export async function loadEducationInfo(): Promise<any[]> {
  const webUrl = "http://sharepoint.fardafan.com";
  const listName = "HREducationInfo";

  try {
    const response = await fetch(
      `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      {
        headers: { Accept: "application/json;odata=verbose" },
      }
    );

    const data = await response.json();
    return data.d.results;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}
