// generates ID based on enemy's x and y position
export const CreateIdForEnemies = (enemies) => {
  return enemies.map((enemy) => {
    generateId(enemy.randomX, enemy.randomY);
  });
};

export function generateId(x, y) {
  const f = x;
  const s = y;
  const id = s * 20 + f;

  return id;
}
