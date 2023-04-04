import { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: [],
  theme: {
    extend: {
      boxShadow: {
        chat: 'rgba(0, 0, 0, 0.1) 0px 0px 15px, rgba(0, 0, 0, 0.1) 0px 0px 3px 1px'
      },
      fontSize: {
        '4xs': '.525rem',
        '3xs': '.6rem',
        '2xs': '.675rem',
        tiny: '.825rem'
      },
      fontWeight: {
        strong: '1000'
      },
      height: {
        main: 'calc(100vh - 3.5rem)'
      },
      maxHeight: ({ theme }) => ({
        ...theme('spacing')
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing')
      }),
      minHeight: ({ theme }) => ({
        ...theme('spacing')
      }),
      minWidth: ({ theme }) => ({
        ...theme('spacing')
      }),
      spacing: {
        100: '25rem',
        108: '27rem',
        120: '30rem'
      }
    }
  }
}
export default tailwindConfig
