// Sample test to verify Vitest setup
import { describe, it, expect } from 'vitest'

describe('Vitest Configuration', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true)
  })

  it('should handle TypeScript', () => {
    const message: string = 'Hello, Vitest!'
    expect(message).toContain('Vitest')
  })

  it('should support async tests', async () => {
    const promise = Promise.resolve('async test')
    await expect(promise).resolves.toBe('async test')
  })
})