import {
  Project as ProjectWrapper,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  git_url: string;
  homepage: string;
}

export const Project = (): JSX.Element => {

  const capstone = {repository: "https://github.com/LetMeGameProject/let-me-game", vercel: "https://letmegame.vercel.app/"}

  const [repositories, setRepositories] = useState<ReposType[]>([]);
  

  console.log(repositories)
 

  useEffect(() => {
    const fetchData = async () => {
      const data: Response = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      )

      const json = await data.json();

      setRepositories(json);

      if (!data.ok) {
        throw data;
      }

      return json;
    };
    fetchData();
  }, []);

  return (
    <>
      {repositories?.map((repository) => (
        <ProjectWrapper key={repository.id}>
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
          >
            {repository.name}
          </Text>

          {repository.language && (
            <ProjectStack>
              <Text type="body2">Linguagem:</Text>
              <ProjectStackTech>
                <Text color="brand1" type="body2">
                  {repository.language}
                </Text>
              </ProjectStackTech>
            </ProjectStack>
          )}

          <Text type="body1" color="grey2">
            {repository.description}
          </Text>
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.git_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.homepage && (
              <ProjectLink target="_blank" href={repository.homepage}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
        <ProjectWrapper>
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
            >
            Let Me Game
          </Text>
          <Text type="body1" color="grey2">
          A Let me Game é uma aplicação Web que permite em poucos cliques encontrar alguém para jogar junto com você os seus jogos favoritos.
          </Text>
            <ProjectLinks>
              <ProjectLink target="_blank" href={capstone.repository}>
                <FaGithub /> Github Code
              </ProjectLink>
              <ProjectLink target="_blank" href={capstone.vercel}>
                <FaShare /> Aplicação
              </ProjectLink>
            </ProjectLinks>
          </ProjectWrapper>
    </>
  );
};
