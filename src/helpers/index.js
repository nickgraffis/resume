import Handlebars from 'handlebars'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const day = (date) => {
  let lastNumber = date % 10
  switch (lastNumber) {
    case 1:
      return date + 'st'
    case 2:
      return date + 'nd'
    case 3:
      return date + 'rd'
    default:
      return date + 'th'
      break;
  }
}

export const helpers = {
    ifEquals: (arg1, arg2) => (arg1 == arg2) ? true : false,
    breaklines: (text) => {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    },
    formatDate: (string) =>{
      const date = new Date(string)
      return `${months[date.getMonth()]} ${day(date.getDate())}, ${date.getFullYear()}`
    },
    buildTime: (string) => {
      const date = new Date(Date.now())
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  }