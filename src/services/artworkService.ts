import type {GetArtworkByIdResponse, GetArtworksResponse} from "../types/artwork";
import api from "./api"

export const getArtworks = async () => {
    const { data } = await api.get<GetArtworksResponse[]>("/artworks")
    return data
}

export const getArtworkById = async (id: string) => {
    const { data } = await api.get<GetArtworkByIdResponse>("/artworks/" + id)
    return data
}