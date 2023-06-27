import apiUrl from "../config";
import fetchApiData from "../fetchApiData";

const dataUser = fetchApiData(`${apiUrl}/User/list`)

export default dataUser;