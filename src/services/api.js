import axios from "axios"

export const BASE_URL="https://pawpals-backend-a93920cecc04.herokuapp.com/"

const Client = axios.create({baseURL: BASE_URL})

export default Client