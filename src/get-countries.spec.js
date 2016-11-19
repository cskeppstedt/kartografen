import getCountries from './get-countries'
describe('get-countries', () => {
  it('should parse the viewBox property', () => {
    const input = [
      {
        name: 'Sverige',
        id: 'sweden',
        viewBox: '285 50 40 90'
      }
    ]

    const expected = [
      {
        name: 'Sverige',
        id: 'sweden',
        viewBox: { x: 285, y: 50, width: 40, height: 90 }
      }
    ]

    const actual = getCountries(input)

    expect(actual).toEqual(expected)
  })

  it('should handle empty input', () => {
    let input
    const expected = []
    const actual = getCountries(input)

    expect(actual).toEqual(expected)
  })

  it('should throw on missing id', () => {
    const input = [
      { name: 'Sverige' }
    ]

    const fn = () => getCountries(input)
    expect(fn).toThrowError(/country is missing the id property/)
  })

  it('should throw on missing name', () => {
    const input = [
      { id: 'sweden' }
    ]

    const fn = () => getCountries(input)
    expect(fn).toThrowError(/sweden is missing the name property/)
  })

  it('should throw on missing viewBox', () => {
    const input = [
      {
        name: 'Sverige',
        id: 'sweden'
      }
    ]

    const fn = () => getCountries(input)
    expect(fn).toThrowError(/sweden is missing the viewBox property/)
  })
})

