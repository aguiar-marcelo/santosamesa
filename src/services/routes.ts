import { headers } from "next/headers";
import { axiosClient as api } from "./api";

export async function getUser(id: number): Promise<any> {
  const { data } = await api.get("/user/" + id);
  return data;
}

export async function postRegister(user: FormData) {
  const { data } = await api.post("/auth/register", user, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function postLogin(email: string, password: string) {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
}

export async function getRestaurantRating(restauratId: number): Promise<any[]> {
  const { data } = await api.get("/rating");
  return data;
}

export async function getRestaurants(): Promise<any[]> {
  const { data } = await api.get("/restaurant");
  return data;
}

export async function postLocalregister(
  name: string,
  aboutUs: string,
  url_img: string
) {
  const { data } = await api.post("/restaurant", {
    name,
    aboutUs,
    url_img,
  });

  return data;
}

export async function postLocalReview(
  value: number,
  restaurantId: string,
  userId: string
) {
  const { data } = await api.post("/restaurant", {
    value,
    restaurantId,
    userId,
  });

  return data;
}

// export async function putEditDriver(
//   id: number,
//   nome: string,
//   cpf: string,
//   cel: string,
//   cel_reserva: string | null
// ) {
//   const { data } = await api.put("/scheduling/driver", {
//     id,
//     nome,
//     cpf,
//     cel,
//     cel_reserva,
//   });

//   return data;
// }
