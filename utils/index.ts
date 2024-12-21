import animateScrollTo from 'animated-scroll-to';

/**
 * Блокировка прокрутки
 * @param {boolean} status
 */
export function scrollLock(status: boolean) {
  const htmlNode = document.querySelector('html') as HTMLElement;
  status ? (htmlNode.style.overflow = 'hidden') : (htmlNode.style.overflow = '');
}

/**
 * Преобразование camelCase в kebab-case
 * @param {string} string
 * @returns {string}
 */
export function camelToKebab(string: string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @param {string} name - класс блока
 * @param {array} mods - модификаторы
 */
export function bem(name: string, mods: { string: boolean } | {} = {}): string {
  const result = [name];

  for (let [mod, value] of Object.entries(mods)) {
    if (value === true) {
      result.push(`${name}_${camelToKebab(mod)}`);
    } else if (value) {
      result.push(`${name}_${camelToKebab(mod)}_${camelToKebab(value)}`);
    }
  }

  return result.join(' ');
}

/**
 * Плавный скролл до элемента
 * @param block - '.class' или '#id' блока
 * @param offset=-40 - расстояние до верхней границы viewport после скролла
 */
export function scrollToBlock(block: string, offset = -40) {
  const store = useStore();
  const destination = document.querySelector(block);
  if (store.isMenuOpened) {
    store.toggleMenu();
  }
  if (destination) {
    animateScrollTo(destination, { cancelOnUserAction: false, verticalOffset: offset });
  }
}

/**
 * Возвращает переданное значение с формами его множественного числа.
 * @param number - значение, с которым нужно вернуть множественную форму.
 * @param one - единственное число. пр. "1 минута".
 * @param two - четное число. пр. "2/3/4 минуты".
 * @param five - пр. "5/6/7/8/9/10 минут"
 */
export function pluralize(number: number, one: string, two: string, five: string) {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return number + ' ' + five
  }
  n %= 10
  if (n === 1) {
    return number + ' ' + one
  }
  if (n >= 2 && n <= 4) {
    return number + ' ' + two
  }
  return number + ' ' + five
}
