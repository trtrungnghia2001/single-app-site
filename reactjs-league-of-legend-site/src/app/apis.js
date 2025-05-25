export async function getChampionList(lang = "en_US") {
  const url = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/${lang}/champion.json`;
  const res = (await fetch(url)).json();
  return res;
}
export async function getChampionID(id, lang = "en_US") {
  const url = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/${lang}/champion/${id}.json`;
  const res = (await fetch(url)).json();
  return res;
}
export async function getItemList(lang = "en_US") {
  const url = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/${lang}/item.json`;
  const res = (await fetch(url)).json();
  return res;
}
export async function getSummonerSpells(lang = "en_US") {
  const url = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/${lang}/summoner.json`;
  const res = (await fetch(url)).json();
  return res;
}
export async function getProfileIcons(lang = "en_US") {
  const url = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/${lang}/profileicon.json`;
  const res = (await fetch(url)).json();
  return res;
}
