export const getLasts = async (tickets) => {
    const res = await fetch('http://localhost:8080/lasts');
    const data = await res.json();

    return data.lasts
}