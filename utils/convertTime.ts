import moment from 'moment';

// timer la 1 object
function convertTime(timer: any) {
  let time = moment(Object.values(timer).join(':'), 'hh:mm').format('hh:mm');
  return time;
}

export default convertTime;
