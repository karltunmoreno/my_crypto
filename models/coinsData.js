async function getApiData() {
  const request = await fetch("/api/crypto")
  const data = await request.json();
  console.log(data)
  return data;
}
const coinsData = getApiData();


exports.coinsData = coinsData;
