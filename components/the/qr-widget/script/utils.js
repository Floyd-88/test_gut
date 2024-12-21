/**
 * Разделяет массив на две части в зависимости от условия
 * @function splitArrayWithCondition
 * @param {Function} conditionFun Функция условия
 * @param {Array} array Массив
 * @returns {{accepted: object[], rejected: object[]}[]}
 */
export function splitArrayWithCondition(conditionFun, array) {
  return array.reduce(
    (acc, cur) => {
      const condition = conditionFun(cur);
      if (condition) {
        acc.accepted.push(cur);
      } else {
        acc.rejected.push(cur);
      }
      return acc;
    },
    {
      accepted: [],
      rejected: [],
    },
  );
}

export function dynamicStateUpdater(stateParam, dynamicParam, props) {
  return state => ({
    [stateParam]: {
      ...state[stateParam],
      [dynamicParam]: props,
    },
  });
}

export function getUrlParams(URL = '') {
  let params;
  if (URL) {
    const URLArr = URL.split('?');
    if (URLArr.length === 2) {
      params = URLArr.pop().split('&');
    } else {
      params = [];
    }
  } else {
    params = window.location.search.slice(1).split('&');
  }

  return params.reduce((result, param) => {
    const [key, value] = param.split('=');
    return Object.assign(result, {
      [key]: value,
    });
  }, {});
}

function getUtmMarks(initMarks) {
  const windowParams = getUrlParams();
  // const isCookiesAvailable = hasCookies();
  let utmMarks = {};

  if (initMarks.length !== 0) {
    initMarks.map(el => {
      const windowUtm = windowParams[el];
      let cookieUtm;
      // if (isCookiesAvailable) {
      //     cookieUtm = getCookie(el);
      // }
      utmMarks = {
        ...utmMarks,
        [el]: cookieUtm || windowUtm,
      };
      return el;
    });
  }

  return utmMarks;
}

export function addUtmMarksToURL(targetURL, utmMarks) {
  const targetURLParams = getUrlParams(targetURL);
  const page = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const utmObj = getUtmMarks(utmMarks);

  const utmObjEntries = Object.entries(utmObj);
  const urlChapter = Object.entries(targetURLParams).length > 0 ? '&' : '?';
  const isEmptyUtm = !utmObjEntries.filter(el => !!el[1]).length;

  if (isEmptyUtm) {
    return `${targetURL}${urlChapter}utm_source=direct&utm_campaign=qr_${page}`;
  }

  const urlSearch = utmObjEntries
    .map(el => {
      const value = el[1];
      if (!value) {
        return undefined;
      }
      return el.join('=');
    })
    .filter(el => !!el)
    .join('&');

  return `${targetURL}${urlChapter}${urlSearch}`;
}


export function formBody(
  targetLink,
  QRCorrectionLevel,
  QRFormat,
  QRSize,
  targetQRCorrectionLevel,
  targetQRFormat,
  targetQRSize,
) {
  const body = {
    url: targetLink,
  };
  if (targetQRCorrectionLevel || QRCorrectionLevel) {
    body.QRcorrectionLevel = targetQRCorrectionLevel || QRCorrectionLevel;
  }
  if (targetQRFormat || QRFormat) {
    body.QRformat = targetQRFormat || QRFormat;
  }
  if (targetQRSize || QRSize) {
    body.QRsize = targetQRSize || QRSize;
  }

  return body;
}
