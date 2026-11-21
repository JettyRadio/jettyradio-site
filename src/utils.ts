import { format } from 'date-fns';
import { pad } from 'es-toolkit';

export const getDjSlug = (dj: string) => {
    if (dj.length <= 0) return 'other'
    return dj.toLowerCase().split(' ').join('-')
}

// Parses dates in the format "02/06/2026"
export const getDateFromString = (date?: string) => {
    if (!date) return new Date(2026, 0, 1);
    const [month, day, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
}

export const airDateHasPassed = (date: string, now = new Date()) => {
    const parts = date.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!parts) return false;
    const parsed = getDateFromString(date);
    if (parsed.getFullYear() !== Number(parts[3]) || parsed.getMonth() + 1 !== Number(parts[1]) || parsed.getDate() !== Number(parts[2])) return false;
    const airDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(now);
    return airDate < today;
}
export const formatShowDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})

export const secondsToString = (seconds: number) => {
    const hours = seconds / (60 * 60)
    const displayHours = Math.floor(hours)
    const displayMinutes = Math.floor(hours % 1 * 60);
    const displaySeconds = Math.floor((hours * 60) % 1 * 60);
    const h = displayHours ? `${displayHours}:` : ''
    const m = `${displayMinutes < 10 ? '0' : ''}${displayMinutes}:`
    const s = `${displaySeconds < 10 ? '0' : ''}${displaySeconds}`
    return `${h}${m}${s}`
}

export const formatDate = (d: Date) => format(d, 'MMMM do, yyyy')
export const formatTime = (d: Date) => format(d, 'h:mmaaa').toLowerCase()
export const formatTimeRange = (start: Date, end: Date) => `${formatTime(start)}-${formatTime(end)}`
export const formatDateRange = (start: Date, end: Date) => `${formatTimeRange(start, end)}, ${formatDate(start)}`

export const reformatDateInput = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
}

const leftPad = (str: string, length: number, char: string) => {
    while (str.length < length) {
        str = char + str
    }
    return str
}

export const getInputValueFromAzuraScheduleTime = (time: number) => {
    const str = leftPad(String(time), 4, '0')
    return `${str[0]}${str[1]}:${str[2]}${str[3]}`
}
