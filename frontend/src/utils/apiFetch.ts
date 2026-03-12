export default async function apiFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: 'Server returned an invalid response' };
    }

    if (res.ok) {
      return { ok: true, data: data}
    } else {
      return { ok: false, data: data}
    }

  } catch (err) {
    return { ok: false, data: { message: "Network error. fetch request failed" } };
  }
} 