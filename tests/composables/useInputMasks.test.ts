import { useInputMasks } from '@/composables/useInputMasks'

describe('useInputMasks', () => {
  const { formatDisplayDate, formatCurrency, getInitial, calculateAge } =
    useInputMasks()

  describe('formatDisplayDate', () => {
    it('converts YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(formatDisplayDate('2025-02-10')).toBe('10/02/2025')
    })
  })

  describe('formatCurrency', () => {
    it('formats value as BRL currency', () => {
      const result = formatCurrency(119.8)
      expect(result).toContain('119')
      expect(result).toContain('80')
    })

    it('formats zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('0')
    })
  })

  describe('getInitial', () => {
    it('returns uppercase first letter', () => {
      expect(getInitial('Maria')).toBe('M')
      expect(getInitial('rex')).toBe('R')
    })

    it('returns empty string for empty input', () => {
      expect(getInitial('')).toBe('')
    })
  })

  describe('calculateAge', () => {
    it('returns age in years for dates older than 1 year', () => {
      const twoYearsAgo = new Date()
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
      const dateStr = `${String(twoYearsAgo.getDate()).padStart(2, '0')}/${String(twoYearsAgo.getMonth() + 1).padStart(2, '0')}/${twoYearsAgo.getFullYear()}`

      expect(calculateAge(dateStr)).toBe('2 anos')
    })

    it('returns singular for 1 year', () => {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      const dateStr = `${String(oneYearAgo.getDate()).padStart(2, '0')}/${String(oneYearAgo.getMonth() + 1).padStart(2, '0')}/${oneYearAgo.getFullYear()}`

      expect(calculateAge(dateStr)).toBe('1 ano')
    })
  })
})
