export async function fetchUser(username = "octocat") {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status === 404) {
    throw new Error("Usuário não encontrado");
  }

  if (response.status === 403) {
    throw new Error("Limite de requisições excedido. Tente novamente mais tarde.");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do GitHub");
  }

  return response.json();
}
