exports.createQueryString = (string, reqQuery) => {
  let queryString = string;

  const { tt, s, Season, Episode } = reqQuery;

  if (tt || s || Season || Episode) {
    let append = " WHERE";

    if (tt) append += ` movie_id='${tt}'`;

    if (s)
      append +=
        append == " WHERE"
          ? ` movie_name like '%${s}%''`
          : ` and movie_name like '%${s}%'`;

    // if (Season)
    //   append +=
    //     append == " WHERE"
    //       ? ` Season='${Season}%''`
    //       : ` and Season='${Season}'`;
    // if (Episode)
    //   append +=
    //     append == " WHERE"
    //       ? ` Episode='${Episode}%''`
    //       : ` and Episode='${Episode}'`;

    queryString += append;
  }

  const page = +reqQuery.page || 1;
  const perPage = 10;

  queryString += ` LIMIT ${(page - 1) * perPage}, ${perPage}`;

  return queryString;
};
