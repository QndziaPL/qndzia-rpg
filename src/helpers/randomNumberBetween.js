export const RandomNumberBetween = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}