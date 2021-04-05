import { randomLcg } from 'd3-random'; // returns a seeded random number generator

export default function getSeededRandom(
/** Seed in the interval [0, 1). */
seed) {
  return randomLcg(seed);
}