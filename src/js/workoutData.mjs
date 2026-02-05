function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(bodyType) {
  return fetch(`../public/json/${bodyType}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findWorkoutByType(type) {
  const workout = await getData();
  return workout.find((item) => item.type === type);
}
