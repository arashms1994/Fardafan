import { getDigest } from "./GetDigest";

export async function handleAddPrice(Id: number, price: number | string) {
  const listName = "shoping";
  const itemType = `SP.Data.${listName}ListItem`;
  const webUrl = "https://crm.zarsim.com";

  try {
    const digest = await getDigest();

    await fetch(
      `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${Id})`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
        },
        body: JSON.stringify({
          __metadata: { type: itemType },
          price: price,
        }),
      }
    );
    console.log("everything is ok");
  } catch (err) {
    console.error(err.message);
  }
}
