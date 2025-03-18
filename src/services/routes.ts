import { axiosClient as api } from "./api";


export async function postRegister(
  email: string,
  password: string,
  role: string
) {
  const { data } = await api.post("/auth/register", {
    email,
    password,
    role,
  });

  return data;
}

export async function postLogin(
  email: string,
  password: string
) {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
}

  // export async function getPlants(): Promise<any[]> {
  //   const { data } = await api.get("/scheduling/plants");
  //   return data;
  // }
  
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