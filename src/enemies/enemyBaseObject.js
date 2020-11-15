export const enemyBaseObject = (
  name,
  stats,
  position = { x: 0, y: 0 },
  exp,
  coins,
  loot,
  type,
  lore,
  img
) => {
  return {
    name: name,
    stats: stats,
    position: position,
    exp: exp,
    coins: coins,
    loot: loot,
    type: type,
    lore: lore,
    img: img,
  };
};
