import React from "react";
import { CharacterDetail } from "./rick-and-morty-characters-details.component";
import { useParams } from "react-router-dom";
import { CharacterInfo } from "./rick-and-morty-characters-details.vm";
import { mapCharacterFromApiToVm } from "./rick-and-morty-characters-details.mappers";
import { getCharacterDetail } from "./api";

export const CharacterDetailContainer: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = React.useState<CharacterInfo>(null);
  const [error, setError] = React.useState(null);

  const loadCharacterDetail = () =>
    getCharacterDetail(id)
      .then((res) => setCharacter(mapCharacterFromApiToVm(res)))
      .catch((err) => {
        setError(`Ha ocurrido un error ${err}`);
        setCharacter(null);
        throw Error(err);
      });
  React.useEffect(() => {
    loadCharacterDetail();
  }, [id]);

  return <CharacterDetail character={character} error={error} id={id} />;
};
