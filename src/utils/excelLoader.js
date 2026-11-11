import { parseExcelFile } from './excelParser'
import { loadFromStorage, saveToStorage } from './storage'

export async function parseAndSave(file) {
  const rows = await parseExcelFile(file)
  const existing = loadFromStorage('excelData') || []
  const merged = mergeData(existing, rows)
  saveToStorage('excelData', merged)

  // Save file to localStorage
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      saveToStorage('excelFile_' + file.name, reader.result)
      resolve(merged)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function mergeData(existing, newRows) {
  const map = new Map()
  for (const row of existing) {
    const key = row[0] || JSON.stringify(row)
    map.set(key, row)
  }
  for (const row of newRows) {
    const key = row[0] || JSON.stringify(row)
    map.set(key, row)
  }
  return Array.from(map.values())
}
