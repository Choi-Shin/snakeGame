export async function getCredit(url) {
  const response = fetch(url, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
