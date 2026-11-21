import { ARCHIVE_PLAYLIST_ID, BASE_URL } from "./constants"
import type { AzuraPlaylist, AzuraShow } from "./types"
import { airDateHasPassed } from "../../utils"

export const getAllFiles = async (apiKey: string): Promise<AzuraShow[]> => {
    const res = await fetch(`${BASE_URL}/files`, {
        headers: {
            'X-API-Key': apiKey,
        },
    })
    return res.json()
}

export const getAllPlaylists = async (apiKey: string): Promise<AzuraPlaylist[]> => {
    const res = await fetch(`${BASE_URL}/playlists`, {
        headers: {
            'X-API-Key': apiKey,
        },
    })
    return res.json()
}


export const clearPlaylist = async (apiKey: string, playlistId: number): Promise<AzuraPlaylist[]> => {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/empty`, {
        method: 'DELETE',
        headers: {
            'X-API-Key': apiKey,
        },
    })
    return res.json()
}

interface UpdateFileData {
    title: string
    artist: string
    setlist: string
    airDate: string
    archive: boolean
    playlistId: number
}

export const updateFile = async (apiKey: string, fileId: number, data: UpdateFileData): Promise<AzuraShow[]> => {
    const res = await fetch(`${BASE_URL}/file/${fileId}`, {
        method: 'PUT',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            artist: data.artist,
            lyrics: data.setlist,
            custom_fields: {
                archive: data.archive ? 'true' : '',
                air_date: data.airDate,
            },
            playlists: [{ id: data.playlistId }]
        })
    })
    return res.json()
}

export const moveFileToArchive = async (apiKey: string, fileId: number) => {
    const fileResponse = await fetch(`${BASE_URL}/file/${fileId}`, {
        headers: { 'X-API-Key': apiKey },
    })
    if (!fileResponse.ok) throw new Error('Could not verify the episode air date before archiving.')
    const file: AzuraShow = await fileResponse.json()
    if (!file.custom_fields.air_date || !airDateHasPassed(file.custom_fields.air_date)) {
        throw new Error('Wait until after the episode’s Pacific air date before archiving it.')
    }
    const res = await fetch(`${BASE_URL}/file/${fileId}`, {
        method: 'PUT',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            playlists: [{ id: ARCHIVE_PLAYLIST_ID }]
        })
    })
    return res.json()
}

export const schedulePlaylist = async (apiKey: string, playlistId: number, date: string, startTime: number, endTime: number) => {
    const res = await fetch(`${BASE_URL}/playlist/${playlistId}`, {
        method: 'PUT',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            is_enabled: true,
            schedule_items: [
                { days: [], start_date: date, end_date: date, start_time: startTime, end_time: endTime }
            ]
        })
    })
    return res.json()
}



export const updateArt = async (apiKey: string, fileId: number, formData: FormData): Promise<AzuraShow[]> => {
    const res = await fetch(`${BASE_URL}/art/${fileId}`, {
        method: 'POST',
        headers: {
            'X-API-Key': apiKey,
            'Accept': 'application/json',
        },
        body: formData
    })
    return res.json()
}
