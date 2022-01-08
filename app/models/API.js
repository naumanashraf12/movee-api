"user strict";
var sql = require("../config");

// Api object constructor
var Api = function (req, api) {
  this.id = api.id;
  this.cast = api.cast;
  this.director = api.director;
  this.genre = api.genre;
  this.gross = api.gross;
  this.metascore = api.metascore;
  this.movie_id = api.movie_id;
  this.movie_name = api.movie_name;
  this.plot = api.plot;
  this.poster = api.poster;
  this.rating = api.rating;
  this.runtime = api.runtime;
  this.votes = api.votes;
  this.year = api.year;
};

Api.create = function (req, newApi, result) {
  sql.query("INSERT INTO api set ?", newApi, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Api.getById = function (req, post, result) {
  sql.query("Select * from api where id= ?", post, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Api.getByYear = function (req, id, result) {
  console.log(id);
  sql.query("Select * from api where year= ?", id, function (err, res) {
    console.log(res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Api.getAll = function (req, result) {
  const queryString = "Select * from api";
  const page = +req.query.page || 1;
  const perPage = 10;
  queryString += ` LIMIT ${(page - 1) & perPage}, ${perPage}`;
  const tt = req.query.tt;
  queryString += tt ? ` WHERE movie_id='${tt}'` : "";
  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Api.updateById = function (req, id, api, result) {
  sql.query(
    "UPDATE api SET id = ?,cast = ?,director = ?,genre = ?,gross = ?,metascore = ?,movie_id = ?,movie_name = ?,plot = ?,poster = ?,rating = ?,runtime = ?,votes = ?,year = ? WHERE id= ?",
    [
      api.id,
      api.cast,
      api.director,
      api.genre,
      api.gross,
      api.metascore,
      api.movie_id,
      api.movie_name,
      api.plot,
      api.poster,
      api.rating,
      api.runtime,
      api.votes,
      api.year,
      id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Api.remove = function (req, id, result) {
  sql.query("DELETE FROM api WHERE id= ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Api;
