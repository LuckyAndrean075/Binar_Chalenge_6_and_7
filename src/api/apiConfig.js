const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "5fdae6bf243f3781c09dd2c93e209588",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
