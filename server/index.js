const express = require("express");
const movies = require("./movies.json");
const cors = require("cors");
const { prisma } = require("./db");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello, World");
});

app.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);
  const count = await prisma.movie.count();
  const movies = await prisma.movie.findMany({
    take: 12,
    skip: offset,
  });
  return res.json({ movies, count });
});

app.get("/movie/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await prisma.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.send(movie);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
