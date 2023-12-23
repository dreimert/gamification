import seedRandom from "seedrandom";

export const getIntFromRange = (min, max, seed) => {
    const rng = new seedRandom(seed);
    return Math.floor(rng() * (max - min + 1)) + min;
};

export const getRandomBytes = (length, seed) => {
    const rng = new seedRandom(seed);
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = Math.floor(rng() * 256);
    }
    return bytes;
};
