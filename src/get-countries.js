export default (countries = []) => countries.map((country) => {
  if (!country.id) {
    throw new Error('country is missing the id property')
  }

  if (!country.name) {
    throw new Error(`${country.id} is missing the name property`)
  }

  return {
    ...country,
    viewBox: parseViewBox(country)
  }
})

const parseViewBox = ({ viewBox, id }) => {
  if (!viewBox) {
    throw new Error(`${id} is missing the viewBox property`)
  }

  const [x, y, width, height] = viewBox.split(' ').map(parseFloat)
  return { x, y, width, height }
}

