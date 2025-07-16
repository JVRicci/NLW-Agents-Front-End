import lib from "dayjs"
import "dayjs/locale/pt-BR"
import relativeTime from "dayjs/plugin/relativeTime"

// Converte datas para o fuso horário brasileiro
lib.locale("pt-BR")
lib.extend(relativeTime)

export const dayjs = lib