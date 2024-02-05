import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./rick-and-morty-characters-details.styles.css";
import { CharacterInfo } from "./rick-and-morty-characters-details.vm";
import { getCharacterDetail } from "./api";
export const CharacterDetail: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = React.useState<CharacterInfo>(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getCharacterDetail(id)
      .then(handleError)
      .then((res) => setCharacter(res))
      .catch((err) => {
        console.log(err);
        setError("Ha ocurrido un error");
        setCharacter(null);
      });
  }, []);
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.status);
    } else {
      return response.json();
    }
  };
  return (
    <>
      <div className="container-detail">
        {character && (
          <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={character.image}
                alt={character.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <p>User Id: {id}</p>
                  <p>{character.name}</p>
                  <p>{character.gender}</p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {character.status}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/character-list">Back to Rick & Morty List Page</Link>
            </CardActions>
          </Card>
        )}
        {error && (
          <div>
            <p className="text-error">{error}</p>
            <Link to="/character-list">Back to Rick & Morty List Page</Link>
          </div>
        )}
      </div>
    </>
  );
};
