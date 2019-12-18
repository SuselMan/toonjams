import theme from 'styled-theming';

const defaultBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#323232'
});

const defaultTextColor = theme('mode', {
  light: '#323232',
  dark: '#fff'
});

export {
  defaultBackgroundColor,
  defaultTextColor
}