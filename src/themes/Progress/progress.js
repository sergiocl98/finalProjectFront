/* eslint-disable no-unused-vars */
import { getColor, mode } from '@chakra-ui/theme-tools';

export const multiColorFilledTrack = (props) => {
  const { theme, colors, value } = props;

  const breakpoints = [];
  let prevColor;

  for (const [pct, color] of Object.entries(colors)) {
    const fillColor = getColor(
      theme,
      mode(`${color}.500`, `${color}.200`)(props),
    );
    if (prevColor && prevColor !== fillColor) {
      breakpoints.push(`${prevColor} ${pct}`);
    }
    prevColor = fillColor;
    breakpoints.push(`${fillColor} ${pct}`);
  }
  breakpoints.push(`${prevColor} 100%`);

  const trackColor = getColor(theme, mode('gray.100', 'gray.600')(props));

  const gradient = `
    linear-gradient(
      to right, 
      transparent 0%, transparent ${value}%, 
      ${trackColor} 0%, ${trackColor} 100%), 
    linear-gradient(
    to right,
    ${breakpoints.join(', ')}
  )`;

  // Need to override the width specified in the style
  // on progress bar
  return {
    minWidth: '100%',
    bgImage: gradient,
  };
};

export const multiSegmentFilledTrack = (props) => {
  const { theme, values, max } = props;

  const breakpoints = [];
  let totalPct = 0;
  const trackColor = getColor(theme, mode('gray.100', 'gray.600')(props));

  for (const [color, val] of Object.entries(values)) {
    // Este metodo por si se quieren utilizar colores propios de chakra
    // const fillColor = getColor(
    //   theme,
    //   mode(`${color}.500`, `${color}.200`)(props),
    // );
    let pct = +Number.parseFloat((val / max) * 100).toFixed(1);

    breakpoints.push(`${color} ${totalPct}%`);

    totalPct += pct;
    if (totalPct > max) {
      totalPct = max;
    }

    breakpoints.push(`${color} ${totalPct}%`);
  }

  if (totalPct < max) {
    breakpoints.push(`${trackColor} ${totalPct}%`);
    breakpoints.push(`${trackColor} 100%`);
  }

  const gradient = `
    linear-gradient(
    to right,
    ${breakpoints.join(', ')}
  )`;

  // Need to override the width specified by style
  return {
    minWidth: '100%',
    bgImage: gradient,
  };
};
