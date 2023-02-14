export const replaceUrl = (cache, profile_image) => {
  let found = false
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === profile_image.userId) {
      cache[i] = [profile_image.userId, profile_image.cacheUrl]
    }
  }
  if (found === false) {
    cache.push([profile_image.userId, profile_image.cacheUrl])
  }
  return cache
}