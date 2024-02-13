import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./rick-and-morty-character-details.styles.css";
import { CharacterInfo } from "./rick-and-morty-characters-details.vm";
interface Props {
  character: CharacterInfo;
  error: string;
  id: string;
}

export const CharacterDetail: React.FC<Props> = (props) => {
  const { character, error, id } = props;

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
