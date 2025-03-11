
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

export async function getProgamationPerDate(
  date: string,
): Promise<ProgamationPerDate[]> {
  const { data } = await api.get("/scheduling/programation-per-date", {
    params: { date },
  });

  return data;
}

export async function getCotasPerProgamation(
  programationId: number,
): Promise<Cota[]> {
  const { data } = await api.get("/scheduling/cotas-per-programation", {
    params: { programationId },
  });

  return data;
}

export async function getSchedulingsPerProgamation(
  programationId: number,
): Promise<SchedulingPerProgamation[]> {
  const { data } = await api.get("/scheduling/schedulings-per-programation", {
    params: { programationId },
  });

  return data;
}

export async function postCota(
  id_programacao: number,
  id_cliente: number,
  cotaType: string,
  id_cliente_venda: number | null,
) {
  const { data } = await api.post("/scheduling/cota", {
    id_programacao,
    id_cliente,
    cotaType,
    id_cliente_venda,
  });

  return data;
}

export async function putCotas(cotas: any[]) {
  const { data } = await api.put("/scheduling/cotas", {
    cotas: cotas,
  });

  return data;
}

export async function deleteCota(cotaId: number) {
  const { data } = await api.delete(`/scheduling/cota/${cotaId}`);

  return data;
}

export async function postCotaTransportadora(
  id_cota: number,
  id_transportadora: number,
) {
  const { data } = await api.post("/scheduling/cota-transportadora", {
    id_cota,
    id_transportadora,
  });

  return data;
}

export async function putCotaTransportadora(transps: any[]) {
  const { data } = await api.put("/scheduling/cotas-transportadora", {
    transps: transps,
  });

  return data;
}

export async function deleteCotaTransportadora(cotaId: number) {
  const { data } = await api.delete(
    `/scheduling/cota-transportadora/${cotaId}`,
  );

  return data;
}

export async function getCotasPerDateAndTransp(
  date: string,
  id_transportadora: number,
  id_cliente: number | undefined,
): Promise<CotasPerDateAndTransp[]> {
  const { data } = await api.get("/scheduling/cotas-per-date-transp", {
    params: { date, id_transportadora, id_cliente },
  });

  return data;
}

export async function getCarrierPerTransp({
  id_transportadora,
}: {
  id_transportadora: number;
}): Promise<CarrierPerTransp[]> {
  const { data } = await api.get("/scheduling/carrier-per-transp", {
    params: { id_transportadora },
  });

  return data;
}


export async function postDriver(driver: { nome: string; cpf: string}) {
  try {
    const { data } = await api.post("/scheduling/register/driver", driver);
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar motorista:", error);
    throw error;
  }
}


export async function getDriversSearch(
  search: string,
): Promise<Driver[]> {
  const { data } = await api.get("/scheduling/drivers-search", {
    params: { search },
  });

  return data;
}

export async function postScheduling(scheduling: FormData) {
  const { data } = await api.post("/scheduling/new-schedulling", scheduling, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function getSchedulings(): Promise<SchedulingDetails[]> {
  const { data } = await api.get("/scheduling/schedulings");

  return data;
}

export async function postExtractValidity(eCnhFile: File) {
  const formData = new FormData();
  formData.append("pdfFile", eCnhFile);

  const { data } = await api.post("/scheduling/extract-validity", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
