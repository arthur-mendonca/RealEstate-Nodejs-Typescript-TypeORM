function amIWilson(p) {
  let wilsons = [
    1, 5, 13, 563, 5971, 558771, 1964215, 8121909, 12326713, 23025711, 26921605,
    341569806, 399292158,
  ];

  wilsons.forEach((number) => {
    if (number === p) {
      return true;
    } else {
      return false;
    }
  });
}
