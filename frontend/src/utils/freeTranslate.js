
const cache = new Map();

async function libreTranslate(text, target = "hi", source = "en") {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source, target, format: "text" })
  });
  if (!res.ok) throw new Error("LibreTranslate error");
  const data = await res.json();
  return data.translatedText;
}

async function googleUnofficial(text, target = "hi", source = "en") {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
    text
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google unofficial error");
  const data = await res.json();
  
  return data[0].map((chunk) => chunk[0]).join("");
}

export async function translateText(text, target = "hi", source = "en") {
  if (!text || target === source) return text;
  const key = `${source}:${target}:${text}`;
  if (cache.has(key)) return cache.get(key);

  try {
    const out = await libreTranslate(text, target, source);
    cache.set(key, out);
    return out;
  } catch {
    try {
      const out = await googleUnofficial(text, target, source);
      cache.set(key, out);
      return out;
    } catch {
     
      return text;
    }
  }
}

export async function translateMany(arr, target = "hi", source = "en") {
  const results = await Promise.all(arr.map((t) => translateText(t, target, source)));
  return results;
}
