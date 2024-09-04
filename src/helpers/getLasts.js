export const getLasts = async (tickets) => {
    const res = await fetch(`${process.env.REACT_APP_SOCKET_URL}/lasts`);
    const data = await res.json();

    return data.lasts
}