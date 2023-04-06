export const parseKeyFromLink = (link) => {
  const spl = link.split("file/")
  if (spl.length < 2) {
      return ""
  }
  const spl2 = spl[1].split("/")
  return spl2[0]
}