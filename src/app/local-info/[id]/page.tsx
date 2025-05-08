"use client";
import LocalInfoPage from "@/components/LocalInfoPage";
import { useParams } from "next/navigation";

export default function LocalInfo() {
  const { id } = useParams();

  if (!id) {
    return <div>ID de restaurante inválido.</div>;
  }
  return <LocalInfoPage id={+id} />;
}
