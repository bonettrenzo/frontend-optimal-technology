import { base_url, version } from "../config/config";


export const urlUserBase = `${base_url}${version}users/`
export const urlWithId = (id) => `${base_url}${version}users/${id}`
