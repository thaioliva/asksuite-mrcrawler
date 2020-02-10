import moment from 'moment';
import mrcrawler from './crawler';

const validateDates = ({ checkin, checkout }) => {
  let msgs = [];
  let init, end;
  if (!checkin) msgs.push('Sem data checkin');
  if (!checkout) msgs.push('Sem data checkout');

  if (checkin.includes('/') || checkin.includes('-')) {
    msgs.push('Formato de data checkin invalida');
  }
  if (checkout.includes('/') || checkout.includes('-')) {
    msgs.push('Formato de data checkout invalida');
  }

  if (!msgs.length) {

    init = checkin.substr(4, 4) + '-' + checkin.substr(2, 2) + '-' + checkin.substr(0, 2);
    const dateInit = moment(init).format('YYYY-MM-DD');

    end = checkout.substr(4, 4) + '-' + checkout.substr(2, 2) + '-' + checkout.substr(0, 2);
    const dateEnd = moment(end).format('YYYY-MM-DD');

    if (!moment(dateInit).isValid()) msgs.push('Data checkin invalida');
    if (!moment(dateEnd).isValid()) msgs.push('Data checkout invalida');
  }
  return msgs;
}

const getRooms = async ({ checkin, checkout }) => {
  return await mrcrawler.run(checkin, checkout);
}

module.exports = {
  getRooms, validateDates
}
