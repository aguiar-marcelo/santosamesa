import { axiosClient as api } from "./api";

export async function getUser(id: number): Promise<any> {
  const { data } = await api.get(`/user/${id}`);
  return data;
}

export async function updateUser(id: number, userData: FormData) {
  const { data } = await api.put(`/auth/update/${id}`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteUser(id: number): Promise<any> {
  const response = await api.delete(`/auth/delete/${id}`);
  return response.data;
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

export async function getRestaurantRating(
  restaurantId: number
): Promise<any[]> {
  const { data } = await api.get("/rating");
  return data;
}

export async function getRestaurants(): Promise<any[]> {
  const { data } = await api.get("/restaurant");
  return data;
}

export async function getCategories(): Promise<any[]> {
  const { data } = await api.get("/category");
  return data;
}

export async function getRatingsByUser(
  id: string,
  query?: { ratings?: number | number[] | null }
): Promise<any[]> {
  const { data } = await api.get(`/rating/user/${id}`, {
    params: query,
  });
  return data;
}

export async function postRestaurant(restaurant: FormData) {
  const { data } = await api.post("/restaurant", restaurant, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function postLocationRestaurant(
  address: string,
  city: string,
  number: string,
  state: string
) {
  const { data } = await api.post("/location", {
    address,
    city,
    number,
    state,
  });
  return data;
}

export async function postLocalReview(
  value: number,
  restaurantId: string,
  userId: string
) {
  const { data } = await api.post("/rating", {
    value,
    restaurantId,
    userId,
  });
  return data;
}

export async function getRestaurantsTopRated(): Promise<any[]> {
  const { data } = await api.get("/restaurant/highlights/system");
  return data;
}
export async function getRestaurantsHighlightsWeek(userId:number): Promise<any[]> {
  const { data } = await api.get(`/restaurant/highlights/weekly/${userId}`);
  return data;
}
export async function getRestaurantsRecommendations(userId:number): Promise<any[]> {
  const { data } = await api.get(`/restaurant/recommendations/${userId}`);
  return data;
}
