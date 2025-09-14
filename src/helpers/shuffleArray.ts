function shuffleArray<T>(array: T[]): T[] {
  let currIndex = array.length;
  let randomIndex: number;

  while (currIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;

    [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]];
  }

  return array;
}

export { shuffleArray };
