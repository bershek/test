import ApiCreator from "./api";

const api = ApiCreator("https://api.datamuse.com");

export const getSynonyms = word => api.get(`words?rel_syn=${word}`);
