"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import "./css/LocalInfoPage.css";
import { apiBaseUrl } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRestaurantById } from "@/services/routes";
import { OrbitProgress } from "react-loading-indicators";

const LocalInfoPage = ({ id }: { id: number }) => {
  const [estrelas, setEstrelas] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [noRatingsMessage, setNoRatingsMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>();

  const { user, token } = useAuth() as { user: User; token: string };
  const router = useRouter();

  const FetchRestaurant = async () => {
    if (id) return;

    setLoading(true);
    try {
      const response = await getRestaurantById(id);

      setData(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const FetchRatings = async () => {
    if (id) return;

    try {
      const response = await fetch(`${apiBaseUrl}/rating/restaurant/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (
          errorData?.message === `No ratings found for restaurant with id ${id}`
        ) {
          setAvaliacoes([]);
          setNoRatingsMessage(
            "Esse restaurante ainda não tem reviews. Seja o primeiro!"
          );
        } else {
          setError("Falha ao carregar as avaliações.");
          setNoRatingsMessage(null);
          setAvaliacoes([]);
        }
        return;
      }

      const results: Avaliacao[] = await response.json();
      setNoRatingsMessage(null);
      setAvaliacoes(results);
    } catch (err) {
      setAvaliacoes([]);
      setError("Falha ao carregar as avaliações.");
    } finally {
    }
  };

  const fetchAverageRating = async () => {
    if (!id) return;
    try {
      const response = await fetch(`${apiBaseUrl}/restaurant/average/${id}`);
      if (!response.ok) {
        return;
      }
      const result: RestaurantAverageRating = await response.json();
      setAverageRating(result.averageRating);
    } catch (error) {
      console.error("Erro ao buscar a média de avaliações:", error);
    }
  };

  const enviarAvaliacao = async () => {
    if (!user?.id) {
      setError("Usuário não autenticado.");
      return;
    }

    if (!id) {
      setError("ID do restaurante inválido.");
      return;
    }

    if (estrelas === 0) {
      setError("Por favor, selecione uma avaliação (estrelas).");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: estrelas,
          restaurantId: id,
          userId: user.id,
          comments: comentario || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("Falha ao enviar a avaliação.");
        return;
      }

      FetchRatings();
      fetchAverageRating();
      setEstrelas(0);
      setComentario("");
    } catch (error) {
      setError("Erro inesperado ao enviar a avaliação.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchRestaurant();
    FetchRatings();
    fetchAverageRating();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <OrbitProgress
          style={{
            fontSize: 15,
            display: "flex",
            justifyItems: "center",
            marginTop: "30%",
          }}
          color="#000000"
          dense
          speedPlus={2}
        />
      </div>
    );
  }

  return (
    <div className="local-info-container background"><button onClick={FetchRestaurant}>log</button>
      <div className="local-image-container">
        <img src={data?.url_img} alt="Local" className="local-image" />
        <div className="local-image-gradient"></div>
      </div>
      <div className="local-content-wrapper">
        <div className="local-info">
          <div className="local-header">
            <div className="local-header-top">
              <button
                // onClick={() => setData(undefined)}
                className="local-back-button"
              >
                <ArrowLeft />
              </button>
              <h1 className="local-title">{data?.name}</h1>
              {Array(Math.round(averageRating))
                .fill(0)
                .map((_, starIndex) => (
                  <img
                    key={`filled-${starIndex}`}
                    className="local-star-filled"
                    src="img/estrela-preenchida.png"
                    alt="Estrela Preenchida"
                  />
                ))}
              {Array(5 - Math.round(averageRating))
                .fill(0)
                .map((_, starIndex) => (
                  <img
                    key={`empty-${starIndex}`}
                    className="local-star-empty"
                    src="img/estrela.png"
                    alt="Estrela Vazia"
                  />
                ))}
            </div>
            <h4 className="local-rating-count">
              {avaliacoes.length} avaliações
            </h4>
          </div>

          <div>
            <h4 className="local-about">sobre</h4>
          </div>

          <div>
            <h2 className="local-reviews-title">Avaliações</h2>
          </div>

          <div>
            {noRatingsMessage ? (
              <div className="local-about">{noRatingsMessage}</div>
            ) : (
              avaliacoes.map((avaliacao, index) => (
                <div
                  key={avaliacao.id}
                  style={{ backgroundColor: "white" }}
                  className={`local-review-card ${
                    index === avaliacoes.length - 1 && !id
                      ? "local-review-card:last-child"
                      : ""
                  }`}
                >
                  <div className="local-review-header">
                    <img
                      className="local-review-profile-picture"
                      src={
                        avaliacao.user?.profilePicture || "/img/user-null.png"
                      }
                      alt={`Foto de Perfil de ${
                        avaliacao.user?.exibitionName ||
                        avaliacao.user?.userName ||
                        "Usuário"
                      }`}
                    />
                    <div className="local-review-user-info">
                      <div className="local-review-user-name-rating">
                        <h3 className="local-review-user-name">
                          {avaliacao.user?.exibitionName ||
                          avaliacao.user?.userName ? (
                            <Link
                              href={`/perfil/${avaliacao.userId}`}
                              className="link-username"
                            >
                              {avaliacao.user.exibitionName ||
                                avaliacao.user.userName}
                            </Link>
                          ) : (
                            "Usuário Anônimo"
                          )}
                        </h3>
                        {Array(avaliacao.value)
                          .fill(0)
                          .map((_, starIndex) => (
                            <img
                              key={starIndex}
                              className="local-review-star"
                              src="img/estrela-preenchida.png"
                              alt="Estrela"
                            />
                          ))}
                      </div>
                      <h5 className="local-review-date">
                        {new Date(avaliacao.createdAt).toLocaleDateString()}
                      </h5>
                    </div>
                  </div>
                  <h4 className="local-review-comment">
                    {avaliacao.comments
                      ? avaliacao.comments
                      : "(Sem comentários)"}
                  </h4>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="local-rating-section">
          <div className="local-rating-card">
            <h2 className="local-rating-title">Deixe sua avaliação!</h2>
            <textarea
              placeholder="Digite sua avaliação aqui..."
              className="local-rating-textarea"
              rows={6}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
                setComentario(target.value);
              }}
            ></textarea>

            <div className="local-rating-stars">
              {Array(5)
                .fill(0)
                .map((_, starIndex) => (
                  <img
                    key={starIndex}
                    className="local-rating-star-button"
                    src={
                      starIndex < estrelas
                        ? "img/estrela-preenchida.png"
                        : "img/estrela.png"
                    }
                    alt="Estrela"
                    onClick={() => setEstrelas(starIndex + 1)}
                  />
                ))}
            </div>
            <button
              className="local-submit-button"
              onClick={enviarAvaliacao}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Avaliação"}
            </button>
            {error && <p className="local-error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalInfoPage;
