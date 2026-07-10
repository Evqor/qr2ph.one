import QRCode from 'qrcode';

export const DEFAULT_STYLE = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  size: 256,
  margin: 1,
  errorCorrectionLevel: 'M',
};

function buildOptions(style) {
  return {
    width: style.size,
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: {
      dark: style.fgColor,
      light: style.bgColor,
    },
  };
}

export function renderToCanvas(canvas, data, style) {
  if (!data) return Promise.resolve(false);
  const options = buildOptions(style);
  return QRCode.toCanvas(canvas, data, options).then(() => true);
}

export function renderToSvgString(data, style) {
  if (!data) return Promise.resolve(null);
  const options = { ...buildOptions(style), type: 'svg' };
  return QRCode.toString(data, options);
}

export function renderToDataUrl(data, style) {
  if (!data) return Promise.resolve(null);
  return QRCode.toDataURL(data, buildOptions(style));
}
