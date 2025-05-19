// import { getDigest } from "./GetDigest";

// export async function addPersonalInfo(
//   title: string,
//   setState: (state: any) => void,
//   onReload: () => void
// ) {
//   const listName = "HRPersonalInfo";
//   const webUrl = "http://sharepoint.fardafan.com";

//   if (!title.trim()) {
//     setState({ message: "لطفاً یک عنوان وارد کنید." });
//     return;
//   }

//   try {
//     const digest = await getDigest();

//     const resType = await fetch(
//       `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
//       {
//         headers: { Accept: "application/json;odata=verbose" },
//       }
//     );
//     const dataType = await resType.json();
//     const itemType = dataType.d.ListItemEntityTypeFullName;

//     const response = await fetch(`${webUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json;odata=verbose",
//         "Content-Type": "application/json;odata=verbose",
//         "X-RequestDigest": digest,
//       },
//       body: JSON.stringify({
//         __metadata: { type: itemType },
//         Title: title,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error.message.value);
//     }

//     setState({ message: `آیتم جدید (${title}) اضافه شد.`, title: "" });
//     onReload();
//   } catch (err: any) {
//     setState({ message: `خطا: ${err.message}` });
//   }
// }