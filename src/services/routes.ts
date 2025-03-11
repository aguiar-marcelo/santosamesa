
import { axiosClient as api } from "./api";

export async function getPlants(): Promise<any[]> {
  const { data } = await api.get("/scheduling/plants");
  return data;
}

export async function putEditDriver(
  id: number,
  nome: string,
  cpf: string,
  cel: string,
  cel_reserva: string | null,
) {
  const { data } = await api.put("/scheduling/driver", {
    id,
    nome,
    cpf,
    cel,
    cel_reserva,
  });

  return data;
}

export async function postProgamation(
  date: string,
  tipo_contrato: string,
  tipo_operacao: string,
  tipo_embalagem: string,
  produtos: { id_produto: number; capacidade: number }[],
  storageId: number,
  plantId: number,
  hours: any,
) {
  const { data } = await api.post("/scheduling/programation", {
    date,
    tipo_contrato,
    tipo_embalagem,
    produtos,
    id_storage: storageId,
    id_planta: plantId,
    hours,
  });

  return data;
}
